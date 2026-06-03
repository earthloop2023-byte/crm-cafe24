import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, CalendarDays, CircleDollarSign, FileText, RefreshCw, Search, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type ContractRow = {
  id: string;
  companyName?: string | null;
  products?: string | null;
  manager?: string | null;
  contractDate?: string | Date | null;
  contractStartDate?: string | Date | null;
  cost?: number | string | null;
  totalAmount?: number | string | null;
};

type DealRow = {
  id: string;
  companyName?: string | null;
  productName?: string | null;
  manager?: string | null;
  status?: string | null;
  createdAt?: string | Date | null;
  contractDate?: string | Date | null;
};

type RefundRow = {
  id: string;
  amount?: number | string | null;
  refundAmount?: number | string | null;
  refundDate?: string | Date | null;
  createdAt?: string | Date | null;
};

function toDateKey(value: unknown): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toMonthKey(value: unknown): string {
  return toDateKey(value).slice(0, 7);
}

function toAmount(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value: number): string {
  return Math.round(value).toLocaleString("ko-KR");
}

function fetchJson<T>(url: string): Promise<T> {
  return fetch(url, { credentials: "include", cache: "no-store" }).then((response) => {
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return response.json();
  });
}

export default function SalesAnalyticsPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(String(currentYear));
  const [searchTerm, setSearchTerm] = useState("");

  const { data: contracts = [], refetch: refetchContracts } = useQuery<ContractRow[]>({
    queryKey: ["/api/contracts-with-financials"],
    queryFn: () => fetchJson<ContractRow[]>("/api/contracts-with-financials"),
  });
  const { data: deals = [], refetch: refetchDeals } = useQuery<DealRow[]>({
    queryKey: ["/api/deals"],
    queryFn: () => fetchJson<DealRow[]>("/api/deals"),
  });
  const { data: refunds = [], refetch: refetchRefunds } = useQuery<RefundRow[]>({
    queryKey: ["/api/refunds"],
    queryFn: () => fetchJson<RefundRow[]>("/api/refunds"),
  });

  const filteredContracts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return contracts.filter((contract) => {
      const monthKey = toMonthKey(contract.contractDate || contract.contractStartDate);
      if (!monthKey.startsWith(year)) return false;
      if (!keyword) return true;
      return [contract.companyName, contract.products, contract.manager]
        .some((value) => String(value || "").toLowerCase().includes(keyword));
    });
  }, [contracts, searchTerm, year]);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => toMonthKey(deal.contractDate || deal.createdAt).startsWith(year));
  }, [deals, year]);

  const filteredRefunds = useMemo(() => {
    return refunds.filter((refund) => toMonthKey(refund.refundDate || refund.createdAt).startsWith(year));
  }, [refunds, year]);

  const totalSales = filteredContracts.reduce(
    (sum, contract) => sum + toAmount(contract.totalAmount ?? contract.cost),
    0,
  );
  const totalRefunds = filteredRefunds.reduce(
    (sum, refund) => sum + toAmount(refund.refundAmount ?? refund.amount),
    0,
  );
  const netSales = totalSales - totalRefunds;

  const monthlyRows = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const month = String(index + 1).padStart(2, "0");
      const monthKey = `${year}-${month}`;
      const monthContracts = filteredContracts.filter((contract) =>
        toMonthKey(contract.contractDate || contract.contractStartDate) === monthKey
      );
      const monthRefunds = filteredRefunds.filter((refund) =>
        toMonthKey(refund.refundDate || refund.createdAt) === monthKey
      );
      const sales = monthContracts.reduce((sum, contract) => sum + toAmount(contract.totalAmount ?? contract.cost), 0);
      const refundAmount = monthRefunds.reduce((sum, refund) => sum + toAmount(refund.refundAmount ?? refund.amount), 0);
      return {
        month: `${index + 1}월`,
        sales,
        refunds: refundAmount,
        net: sales - refundAmount,
        count: monthContracts.length,
      };
    });
  }, [filteredContracts, filteredRefunds, year]);

  const managerRows = useMemo(() => {
    const rows = new Map<string, { manager: string; sales: number; count: number }>();
    for (const contract of filteredContracts) {
      const manager = String(contract.manager || "미지정").trim() || "미지정";
      const current = rows.get(manager) || { manager, sales: 0, count: 0 };
      current.sales += toAmount(contract.totalAmount ?? contract.cost);
      current.count += 1;
      rows.set(manager, current);
    }
    return Array.from(rows.values()).sort((left, right) => right.sales - left.sales).slice(0, 10);
  }, [filteredContracts]);

  const recentContracts = filteredContracts.slice(0, 20);
  const yearOptions = Array.from({ length: 4 }, (_, index) => String(currentYear - index));

  const refreshAll = () => {
    refetchContracts();
    refetchDeals();
    refetchRefunds();
  };

  return (
    <div className="min-h-full bg-background p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">매출분석</h1>
          <p className="text-sm text-muted-foreground">계약, 영업, 환불 데이터를 기준으로 연간 매출 흐름을 확인합니다.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="업체, 상품, 담당자 검색"
              className="pl-9 sm:w-72"
            />
          </div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}년</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshAll}>
            <RefreshCw className="mr-2 h-4 w-4" />
            새로고침
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CircleDollarSign className="h-4 w-4" />
              총 매출
            </div>
            <div className="mt-2 text-2xl font-bold">{formatAmount(totalSales)}원</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              순매출
            </div>
            <div className="mt-2 text-2xl font-bold">{formatAmount(netSales)}원</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              계약 건수
            </div>
            <div className="mt-2 text-2xl font-bold">{formatAmount(filteredContracts.length)}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              영업 건수
            </div>
            <div className="mt-2 text-2xl font-bold">{formatAmount(filteredDeals.length)}건</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              월별 매출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={formatAmount} />
                  <Tooltip formatter={(value: number) => `${formatAmount(value)}원`} />
                  <Bar dataKey="sales" name="매출" fill="#2563eb" />
                  <Bar dataKey="refunds" name="환불" fill="#ef4444" />
                  <Bar dataKey="net" name="순매출" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">담당자별 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>담당자</TableHead>
                    <TableHead className="text-right">매출</TableHead>
                    <TableHead className="text-right">건수</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managerRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="py-8 text-center text-sm text-muted-foreground">
                        데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    managerRows.map((row) => (
                      <TableRow key={row.manager}>
                        <TableCell className="font-medium">{row.manager}</TableCell>
                        <TableCell className="text-right">{formatAmount(row.sales)}원</TableCell>
                        <TableCell className="text-right">{formatAmount(row.count)}건</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">최근 계약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>계약일</TableHead>
                  <TableHead>업체</TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead className="text-right">금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentContracts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                      표시할 계약이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="whitespace-nowrap">{toDateKey(contract.contractDate || contract.contractStartDate) || "-"}</TableCell>
                      <TableCell className="min-w-40">{contract.companyName || "-"}</TableCell>
                      <TableCell className="min-w-48">{contract.products || "-"}</TableCell>
                      <TableCell className="whitespace-nowrap">{contract.manager || "-"}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {formatAmount(toAmount(contract.totalAmount ?? contract.cost))}원
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

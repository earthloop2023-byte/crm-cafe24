var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default;
var init_vite_config = __esm({
  async "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react(),
        runtimeErrorOverlay(),
        ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
          await import("@replit/vite-plugin-cartographer").then(
            (m) => m.cartographer()
          ),
          await import("@replit/vite-plugin-dev-banner").then(
            (m) => m.devBanner()
          )
        ] : []
      ],
      resolve: {
        alias: {
          "@": path3.resolve(import.meta.dirname, "client", "src"),
          "@shared": path3.resolve(import.meta.dirname, "shared"),
          "@assets": path3.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path3.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path3.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true
      },
      server: {
        fs: {
          strict: true,
          deny: ["**/.*"]
        }
      }
    });
  }
});

// server/vite.ts
var vite_exports = {};
__export(vite_exports, {
  setupVite: () => setupVite
});
import { createServer as createViteServer, createLogger } from "vite";
import fs3 from "fs";
import path4 from "path";
import { nanoid } from "nanoid";
async function setupVite(server, app2) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("/{*path}", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const templateCandidates = [
        path4.resolve(import.meta.dirname, "..", "client", "index.html"),
        path4.resolve(import.meta.dirname, "public", "index.html"),
        path4.resolve(import.meta.dirname, "..", "dist", "public", "index.html")
      ];
      const clientTemplate = templateCandidates.find((candidate) => fs3.existsSync(candidate)) ?? templateCandidates[0];
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
var viteLogger;
var init_vite = __esm({
  async "server/vite.ts"() {
    "use strict";
    await init_vite_config();
    viteLogger = createLogger();
  }
});

// server/index.ts
import express2 from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// server/routes.ts
import crypto3 from "crypto";

// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  activities: () => activities,
  allPages: () => allPages,
  contacts: () => contacts,
  contracts: () => contracts,
  counselorPositions: () => counselorPositions,
  customers: () => customers,
  databaseBackups: () => databaseBackups,
  dealStages: () => dealStages,
  dealTimelines: () => dealTimelines,
  deals: () => deals,
  departmentDefaultPages: () => departmentDefaultPages,
  deposits: () => deposits,
  executivePositions: () => executivePositions,
  importBatches: () => importBatches,
  importMappings: () => importMappings,
  importStagingRows: () => importStagingRows,
  insertActivitySchema: () => insertActivitySchema,
  insertContactSchema: () => insertContactSchema,
  insertContractSchema: () => insertContractSchema,
  insertCustomerSchema: () => insertCustomerSchema,
  insertDatabaseBackupSchema: () => insertDatabaseBackupSchema,
  insertDealSchema: () => insertDealSchema,
  insertDealTimelineSchema: () => insertDealTimelineSchema,
  insertDepositSchema: () => insertDepositSchema,
  insertImportBatchSchema: () => insertImportBatchSchema,
  insertImportMappingSchema: () => insertImportMappingSchema,
  insertImportStagingRowSchema: () => insertImportStagingRowSchema,
  insertKeepSchema: () => insertKeepSchema,
  insertNoticeSchema: () => insertNoticeSchema,
  insertPagePermissionSchema: () => insertPagePermissionSchema,
  insertPaymentSchema: () => insertPaymentSchema,
  insertProductRateHistorySchema: () => insertProductRateHistorySchema,
  insertProductSchema: () => insertProductSchema,
  insertRefundSchema: () => insertRefundSchema,
  insertRegionalCustomerListSchema: () => insertRegionalCustomerListSchema,
  insertRegionalManagementFeeSchema: () => insertRegionalManagementFeeSchema,
  insertSystemLogSchema: () => insertSystemLogSchema,
  insertSystemSettingSchema: () => insertSystemSettingSchema,
  insertUserSchema: () => insertUserSchema,
  keeps: () => keeps,
  managerPositions: () => managerPositions,
  notices: () => notices,
  pagePermissions: () => pagePermissions,
  payments: () => payments,
  positionDefaultPages: () => positionDefaultPages,
  positionOptions: () => positionOptions,
  productCategories: () => productCategories,
  productRateHistories: () => productRateHistories,
  products: () => products,
  refunds: () => refunds,
  regionalCustomerLists: () => regionalCustomerLists,
  regionalManagementFees: () => regionalManagementFees,
  systemLogTypes: () => systemLogTypes,
  systemLogs: () => systemLogs,
  systemSettings: () => systemSettings,
  users: () => users,
  vatTypes: () => vatTypes
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  loginId: text("login_id").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: text("role"),
  department: text("department"),
  workStatus: text("work_status").default("\uC7AC\uC9C1\uC911"),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  lastPasswordChangeAt: timestamp("last_password_change_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  lastLoginAt: true,
  lastPasswordChangeAt: true,
  createdAt: true
});
var customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  status: text("status").notNull().default("active"),
  customerType: text("customer_type"),
  customerCategory: text("customer_category"),
  serviceType: text("service_type"),
  managerName: text("manager_name"),
  lifecycleStage: text("lifecycle_stage").notNull().default("customer"),
  keepBalanceAdjustment: integer("keep_balance_adjustment").notNull().default(0),
  notes: text("notes"),
  createdByName: text("created_by_name"),
  createdByUserId: varchar("created_by_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull().references(() => customers.id),
  name: text("name").notNull(),
  position: text("position"),
  email: text("email"),
  phone: text("phone"),
  isPrimary: boolean("is_primary").default(false)
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true
});
var dealStages = ["lead", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"];
var deals = pgTable("deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  parentDealId: varchar("parent_deal_id"),
  title: text("title").notNull(),
  customerId: varchar("customer_id").references(() => customers.id),
  value: integer("value").notNull().default(0),
  stage: text("stage").notNull().default("new"),
  probability: integer("probability").notNull().default(0),
  expectedCloseDate: timestamp("expected_close_date"),
  inboundDate: timestamp("inbound_date"),
  contractStartDate: timestamp("contract_start_date"),
  contractEndDate: timestamp("contract_end_date"),
  churnDate: timestamp("churn_date"),
  renewalDueDate: timestamp("renewal_due_date"),
  contractStatus: text("contract_status"),
  notes: text("notes"),
  phone: text("phone"),
  email: text("email"),
  billingAccountNumber: text("billing_account_number"),
  companyName: text("company_name"),
  industry: text("industry"),
  telecomProvider: text("telecom_provider"),
  customerDisposition: text("customer_disposition"),
  customerTypeDetail: text("customer_type_detail"),
  firstProgressStatus: text("first_progress_status"),
  secondProgressStatus: text("second_progress_status"),
  additionalProgressStatus: text("additional_progress_status"),
  acquisitionChannel: text("acquisition_channel"),
  cancellationReason: text("cancellation_reason"),
  salesperson: text("salesperson"),
  preChurnStage: text("pre_churn_stage"),
  lineCount: integer("line_count").default(1),
  cancelledLineCount: integer("cancelled_line_count").default(0),
  productId: varchar("product_id"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertDealSchema = createInsertSchema(deals).omit({
  id: true,
  createdAt: true
});
var dealTimelines = pgTable("deal_timelines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dealId: varchar("deal_id").notNull().references(() => deals.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  authorName: text("author_name"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertDealTimelineSchema = createInsertSchema(dealTimelines).omit({
  id: true,
  createdAt: true
});
var regionalManagementFees = pgTable("regional_management_fees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  feeDate: timestamp("fee_date").notNull(),
  amount: integer("amount").notNull().default(0),
  productName: text("product_name").notNull(),
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertRegionalManagementFeeSchema = createInsertSchema(regionalManagementFees).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var regionalCustomerLists = pgTable("regional_customer_lists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tier: text("tier").notNull(),
  customerName: text("customer_name").notNull(),
  registrationCount: integer("registration_count").notNull().default(0),
  sameCustomer: text("same_customer"),
  exposureNotice: boolean("exposure_notice").notNull().default(false),
  blogReview: boolean("blog_review").notNull().default(false),
  csTimeline: text("cs_timeline"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertRegionalCustomerListSchema = createInsertSchema(regionalCustomerLists).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  description: text("description").notNull(),
  customerId: varchar("customer_id").references(() => customers.id),
  dealId: varchar("deal_id").references(() => deals.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true
});
var payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").references(() => contracts.id),
  depositDate: timestamp("deposit_date").notNull(),
  customerName: text("customer_name").notNull(),
  manager: text("manager").notNull(),
  amount: integer("amount").notNull().default(0),
  depositConfirmed: boolean("deposit_confirmed").default(false),
  paymentMethod: text("payment_method"),
  invoiceIssued: boolean("invoice_issued").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true
});
var systemLogTypes = [
  "login",
  "logout",
  "register",
  "profile_update",
  "password_change",
  "government_update",
  "data_export",
  "settings_change",
  "contract_update",
  "excel_upload",
  "data_backup"
];
var systemLogs = pgTable("system_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  loginId: text("login_id").notNull(),
  userName: text("user_name").notNull(),
  action: text("action").notNull(),
  actionType: text("action_type").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertSystemLogSchema = createInsertSchema(systemLogs).omit({
  id: true,
  createdAt: true
});
var productCategories = [
  "\uC2AC\uB86F\uC0C1\uD488",
  "\uBC14\uC774\uB7F4\uC0C1\uD488",
  "\uC6D4 \uBCF4\uC7A5 \uC0C1\uD488",
  "\uC678\uC8FC \uC2E4\uD589 \uBE44\uC6A9",
  "\uAE30\uD0C0"
];
var vatTypes = ["\uBD80\uAC00\uC138\uBCC4\uB3C4", "\uBD80\uAC00\uC138\uD3EC\uD568", "\uBA74\uC138"];
var products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  unitPrice: integer("unit_price").notNull().default(0),
  unit: text("unit"),
  baseDays: integer("base_days").default(0),
  workCost: integer("work_cost").default(0),
  purchasePrice: integer("purchase_price").default(0),
  vatType: text("vat_type").default("\uBD80\uAC00\uC138\uBCC4\uB3C4"),
  worker: text("worker"),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var productRateHistories = pgTable("product_rate_histories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  productName: text("product_name").notNull(),
  effectiveFrom: timestamp("effective_from").notNull(),
  unitPrice: integer("unit_price").notNull().default(0),
  workCost: integer("work_cost").default(0),
  baseDays: integer("base_days").default(0),
  vatType: text("vat_type").default("\uBD80\uAC00\uC138\uBCC4\uB3C4"),
  worker: text("worker"),
  changedBy: text("changed_by"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});
var insertProductRateHistorySchema = createInsertSchema(productRateHistories).omit({
  id: true,
  createdAt: true
});
var contracts = pgTable("contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractNumber: text("contract_number").notNull(),
  contractDate: timestamp("contract_date").notNull(),
  contractName: text("contract_name"),
  managerId: varchar("manager_id").references(() => users.id),
  managerName: text("manager_name").notNull(),
  customerId: varchar("customer_id").references(() => customers.id),
  customerName: text("customer_name").notNull(),
  products: text("products"),
  cost: integer("cost").notNull().default(0),
  days: integer("days").default(0),
  quantity: integer("quantity").default(0),
  addQuantity: integer("add_quantity").default(0),
  extendQuantity: integer("extend_quantity").default(0),
  paymentConfirmed: boolean("payment_confirmed").default(false),
  paymentMethod: text("payment_method"),
  depositBank: text("deposit_bank"),
  invoiceIssued: text("invoice_issued"),
  worker: text("worker"),
  workCost: integer("work_cost").default(0),
  notes: text("notes"),
  disbursementStatus: text("disbursement_status"),
  executionPaymentStatus: text("execution_payment_status").default("\uC785\uAE08\uC608\uC815"),
  userIdentifier: text("user_identifier"),
  productDetailsJson: text("product_details_json"),
  renewalDueDate: timestamp("renewal_due_date"),
  renewalAlertDisabled: boolean("renewal_alert_disabled").notNull().default(false),
  contractType: text("contract_type"),
  sourceContractId: varchar("source_contract_id"),
  sourceItemId: text("source_item_id"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true
});
var refunds = pgTable("refunds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id, { onDelete: "cascade" }),
  itemId: text("item_id"),
  userIdentifier: text("user_identifier"),
  productName: text("product_name"),
  days: integer("days").default(0),
  addQuantity: integer("add_quantity").default(0),
  extendQuantity: integer("extend_quantity").default(0),
  targetAmount: integer("target_amount").default(0),
  amount: integer("amount").notNull(),
  quantity: integer("quantity").default(0),
  refundDays: integer("refund_days").default(0),
  account: text("account"),
  slot: text("slot"),
  reason: text("reason"),
  worker: text("worker"),
  previousPaymentMethod: text("previous_payment_method"),
  refundStatus: text("refund_status"),
  refundDate: timestamp("refund_date").notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertRefundSchema = createInsertSchema(refunds).omit({
  id: true,
  createdAt: true
});
var keeps = pgTable("keeps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id, { onDelete: "cascade" }),
  itemId: text("item_id"),
  userIdentifier: text("user_identifier"),
  productName: text("product_name"),
  days: integer("days").default(0),
  addQuantity: integer("add_quantity").default(0),
  extendQuantity: integer("extend_quantity").default(0),
  targetAmount: integer("target_amount").default(0),
  amount: integer("amount").notNull(),
  keepDate: timestamp("keep_date").notNull(),
  reason: text("reason"),
  worker: text("worker"),
  previousPaymentMethod: text("previous_payment_method"),
  keepStatus: text("keep_status"),
  decisionBy: text("decision_by"),
  decisionAt: timestamp("decision_at"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertKeepSchema = createInsertSchema(keeps).omit({
  id: true,
  createdAt: true
});
var deposits = pgTable("deposits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  depositDate: timestamp("deposit_date").notNull(),
  depositorName: text("depositor_name").notNull(),
  depositAmount: integer("deposit_amount").notNull().default(0),
  depositBank: text("deposit_bank"),
  notes: text("notes"),
  confirmedAmount: integer("confirmed_amount").default(0),
  totalContractAmount: integer("total_contract_amount").default(0),
  contractId: varchar("contract_id").references(() => contracts.id),
  confirmedBy: text("confirmed_by"),
  confirmedAt: timestamp("confirmed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertDepositSchema = createInsertSchema(deposits).omit({
  id: true,
  createdAt: true
});
var notices = pgTable("notices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  authorName: text("author_name").notNull(),
  isPinned: boolean("is_pinned").default(false),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertNoticeSchema = createInsertSchema(notices).omit({
  id: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true
});
var pagePermissions = pgTable("page_permissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  pageKey: text("page_key").notNull()
});
var insertPagePermissionSchema = createInsertSchema(pagePermissions).omit({
  id: true
});
var systemSettings = pgTable("system_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  settingKey: text("setting_key").notNull().unique(),
  settingValue: text("setting_value").notNull().default("")
});
var insertSystemSettingSchema = createInsertSchema(systemSettings).omit({
  id: true
});
var databaseBackups = pgTable("database_backups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  label: text("label"),
  createdByName: text("created_by_name").notNull(),
  createdByUserId: varchar("created_by_user_id"),
  tableCounts: text("table_counts"),
  sizeBytes: integer("size_bytes").default(0),
  data: text("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertDatabaseBackupSchema = createInsertSchema(databaseBackups).omit({
  id: true,
  createdAt: true
});
var importBatches = pgTable("import_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  userName: text("user_name").notNull(),
  fileName: text("file_name").notNull(),
  sheetName: text("sheet_name"),
  sheetType: text("sheet_type").notNull(),
  status: text("status").notNull().default("pending"),
  totalRows: integer("total_rows").default(0),
  validRows: integer("valid_rows").default(0),
  errorRows: integer("error_rows").default(0),
  importedRows: integer("imported_rows").default(0),
  mappingConfig: text("mapping_config"),
  errorDetails: text("error_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at")
});
var insertImportBatchSchema = createInsertSchema(importBatches).omit({
  id: true,
  createdAt: true
});
var importStagingRows = pgTable("import_staging_rows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchId: varchar("batch_id").notNull().references(() => importBatches.id, { onDelete: "cascade" }),
  rowIndex: integer("row_index").notNull(),
  rawData: text("raw_data").notNull(),
  contractDate: timestamp("contract_date"),
  customerName: text("customer_name"),
  userIdentifier: text("user_identifier"),
  managerName: text("manager_name"),
  productName: text("product_name"),
  unitPrice: integer("unit_price").default(0),
  days: integer("days").default(0),
  quantity: integer("quantity").default(1),
  cost: integer("cost").default(0),
  workCost: integer("work_cost").default(0),
  workerName: text("worker_name"),
  supplyAmount: integer("supply_amount").default(0),
  vatAmount: integer("vat_amount").default(0),
  paymentConfirmed: text("payment_confirmed"),
  invoiceIssued: text("invoice_issued"),
  disbursementStatus: text("disbursement_status"),
  notes: text("notes"),
  errors: text("errors"),
  isValid: boolean("is_valid").default(true),
  isDuplicate: boolean("is_duplicate").default(false)
});
var insertImportStagingRowSchema = createInsertSchema(importStagingRows).omit({
  id: true
});
var importMappings = pgTable("import_mappings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  sheetType: text("sheet_type").notNull(),
  mappingConfig: text("mapping_config").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertImportMappingSchema = createInsertSchema(importMappings).omit({
  id: true,
  createdAt: true
});
var allPages = [
  { key: "sales_analytics", label: "\uB9E4\uCD9C\uBD84\uC11D", path: "/analytics/sales" },
  { key: "leads", label: "\uB9AC\uB4DC", path: "/leads" },
  { key: "customer_companies", label: "\uACE0\uAC1D\uC0AC", path: "/customer-companies" },
  { key: "customers", label: "\uB9AC\uB4DC/\uACE0\uAC1D\uC0AC", path: "/leads" },
  { key: "contracts", label: "\uACC4\uC57D\uAD00\uB9AC", path: "/contracts" },
  { key: "products", label: "\uC0C1\uD488\uAD00\uB9AC", path: "/products" },
  { key: "payments", label: "\uB9E4\uCD9C\uAD00\uB9AC", path: "/payments" },
  { key: "refunds", label: "\uD658\uBD88\uAD00\uB9AC", path: "/refunds" },
  { key: "receivables", label: "\uBBF8\uC218\uAE08\uAD00\uB9AC", path: "/receivables" },
  { key: "deposit_confirmations", label: "\uC785\uAE08\uC644\uB8CC", path: "/deposit-confirmations" },
  { key: "notice", label: "\uACF5\uC9C0\uC0AC\uD56D", path: "/notice" },
  { key: "users", label: "\uC0AC\uC6A9\uC790\uAD00\uB9AC", path: "/settings/users" },
  { key: "system_logs", label: "\uC2DC\uC2A4\uD15C\uB85C\uADF8", path: "/settings/logs" },
  { key: "permissions", label: "\uAD8C\uD55C\uC124\uC815", path: "/settings/permissions" },
  { key: "system_settings", label: "\uC2DC\uC2A4\uD15C\uC124\uC815", path: "/settings/system" },
  { key: "backup", label: "\uBC31\uC5C5\uAD00\uB9AC", path: "/settings/backup" }
];
var positionOptions = ["\uB300\uD45C", "\uC774\uC0AC", "\uC2E4\uC7A5", "\uD300\uC7A5", "\uB9E4\uB2C8\uC800", "\uC0C1\uB2F4\uC6D0"];
var executivePositions = ["\uB300\uD45C", "\uC774\uC0AC", "\uB300\uD45C\uC774\uC0AC", "\uCD1D\uAD04\uC774\uC0AC", "\uAC1C\uBC1C\uC790"];
var managerPositions = ["\uB9E4\uB2C8\uC800"];
var counselorPositions = ["\uC0C1\uB2F4\uC6D0"];
var leadCustomerPages = ["leads", "customer_companies", "customers"];
var staffCommonPages = [
  "sales_analytics",
  ...leadCustomerPages,
  "contracts",
  "products",
  "payments",
  "refunds",
  "receivables",
  "deposit_confirmations",
  "notice"
];
var positionDefaultPages = {
  "\uB300\uD45C": allPages.map((page) => page.key).filter((key) => key !== "system_settings" && key !== "backup"),
  "\uC774\uC0AC": allPages.map((page) => page.key).filter((key) => key !== "system_settings" && key !== "backup"),
  "\uB300\uD45C\uC774\uC0AC": allPages.map((page) => page.key).filter((key) => key !== "system_settings" && key !== "backup"),
  "\uCD1D\uAD04\uC774\uC0AC": allPages.map((page) => page.key).filter((key) => key !== "system_settings" && key !== "backup"),
  "\uAC1C\uBC1C\uC790": allPages.map((page) => page.key),
  "\uC2E4\uC7A5": staffCommonPages,
  "\uD300\uC7A5": staffCommonPages,
  "\uB9E4\uB2C8\uC800": [
    "sales_analytics",
    ...leadCustomerPages,
    "contracts",
    "refunds",
    "receivables",
    "deposit_confirmations",
    "notice"
  ],
  "\uC0C1\uB2F4\uC6D0": ["leads"]
};
var departmentDefaultPages = {
  "\uB9C8\uCF00\uD305\uC601\uC5C5\uD300": ["contracts", "customers", "deposit_confirmations", "products", "sales_analytics", "notice"],
  "\uB9C8\uCF00\uD305\uAE30\uD68D\uD300": ["contracts", "customers", "deposit_confirmations", "products", "sales_analytics", "notice"],
  "\uC5F0\uAD6C\uAC1C\uBC1C\uD300": allPages.map((page) => page.key),
  "\uB9C8\uCF00\uD305\uD300": ["contracts", "customers", "deposit_confirmations", "products", "sales_analytics", "notice"],
  "\uACBD\uC601\uC9C0\uC6D0\uD300": ["sales_analytics", "payments", "receivables", "deposit_confirmations", "notice"],
  "\uACBD\uC601\uC9C0\uC6D0\uC2E4": ["sales_analytics", "payments", "receivables", "deposit_confirmations", "notice"]
};

// server/db.ts
var { Pool } = pg;
function readEnv(name) {
  return String(process.env[name] || "").trim();
}
function firstEnv(names) {
  for (const name of names) {
    const value = readEnv(name);
    if (value) return value;
  }
  return "";
}
function resolveDatabaseUrl() {
  const explicitUrl = firstEnv([
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRESQL_URL",
    "POSTGRES_PRISMA_URL",
    "PGDATABASE_URL",
    "DATABASE_PRIVATE_URL",
    "DB_URL"
  ]);
  if (explicitUrl) return explicitUrl;
  const host = firstEnv(["DB_HOST", "PGHOST", "POSTGRES_HOST", "POSTGRESQL_HOST"]);
  const database = firstEnv(["DB_NAME", "DB_DATABASE", "POSTGRES_DB", "POSTGRES_DATABASE", "PGDATABASE"]);
  const user = firstEnv(["DB_USER", "DB_USERNAME", "POSTGRES_USER", "POSTGRES_USERNAME", "PGUSER"]);
  const password = firstEnv(["DB_PASSWORD", "POSTGRES_PASSWORD", "PGPASSWORD"]);
  const port2 = firstEnv(["DB_PORT", "PGPORT", "POSTGRES_PORT", "POSTGRESQL_PORT"]) || "5432";
  if (!host || !database || !user) return "";
  const auth = password ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}` : encodeURIComponent(user);
  return `postgres://${auth}@${host}:${encodeURIComponent(port2)}/${encodeURIComponent(database)}`;
}
var databaseUrl = resolveDatabaseUrl();
var hasDatabaseConfig = Boolean(databaseUrl);
if (!hasDatabaseConfig) {
  console.warn("[db] database connection is not configured. DB-backed features are disabled until env vars are provided.");
}
var pool = new Pool({
  connectionString: databaseUrl || "postgres://invalid:invalid@127.0.0.1:1/invalid",
  connectionTimeoutMillis: databaseUrl ? void 0 : 1e3,
  max: databaseUrl ? void 0 : 1
});
var db = drizzle(pool, { schema: schema_exports });
async function tableExists(tableName) {
  const result = await pool.query("select to_regclass($1) is not null as exists", [
    `public.${tableName}`
  ]);
  return Boolean(result.rows[0]?.exists);
}
async function ensureDatabasePerformanceObjects() {
  if (!hasDatabaseConfig) {
    console.log("[db] performance indexes skipped because database is not configured.");
    return;
  }
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
  } catch (error) {
    console.warn("[db] pg_trgm extension setup skipped.");
    console.warn(error);
  }
  const hasContracts = await tableExists("contracts");
  const hasProducts = await tableExists("products");
  if (!hasContracts && !hasProducts) {
    console.log("[db] performance indexes skipped because base tables are not ready yet.");
    return;
  }
  const statements = [
    ...hasContracts ? [
      `CREATE INDEX IF NOT EXISTS idx_contracts_contract_date ON contracts (contract_date DESC)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_manager_name ON contracts (manager_name)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_customer_name ON contracts (customer_name)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_payment_method ON contracts (payment_method)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON contracts (created_at DESC)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_contract_number_trgm ON contracts USING gin (contract_number gin_trgm_ops)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_customer_name_trgm ON contracts USING gin (customer_name gin_trgm_ops)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_manager_name_trgm ON contracts USING gin (manager_name gin_trgm_ops)`,
      `CREATE INDEX IF NOT EXISTS idx_contracts_products_trgm ON contracts USING gin (products gin_trgm_ops)`
    ] : [],
    ...hasProducts ? [`CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)`] : []
  ];
  for (const statement of statements) {
    try {
      await pool.query(statement);
    } catch (error) {
      console.warn("[db] performance object setup skipped for statement:", statement);
      console.warn(error);
    }
  }
}

// server/storage.ts
import { and, asc, count, desc, eq, ilike, inArray, lte, gte, or, sql as sql2 } from "drizzle-orm";

// shared/korean-search.ts
var HANGUL_START = 44032;
var HANGUL_END = 55203;
var HANGUL_CYCLE = 21 * 28;
var CHOSEONG = [
  "\u3131",
  // ㄱ
  "\u3132",
  // ㄲ
  "\u3134",
  // ㄴ
  "\u3137",
  // ㄷ
  "\u3138",
  // ㄸ
  "\u3139",
  // ㄹ
  "\u3141",
  // ㅁ
  "\u3142",
  // ㅂ
  "\u3143",
  // ㅃ
  "\u3145",
  // ㅅ
  "\u3146",
  // ㅆ
  "\u3147",
  // ㅇ
  "\u3148",
  // ㅈ
  "\u3149",
  // ㅉ
  "\u314A",
  // ㅊ
  "\u314B",
  // ㅋ
  "\u314C",
  // ㅌ
  "\u314D",
  // ㅍ
  "\u314E"
  // ㅎ
];
var SEARCH_SEPARATOR_PATTERN = /[\s\-_/.,()[\]{}]+/g;
var CHOSEONG_PATTERN = /^[\u3131-\u314e]+$/;
function normalizeBase(value) {
  return value.toLowerCase().replace(SEARCH_SEPARATOR_PATTERN, "").trim();
}
function normalizeKoreanSearchText(value) {
  return normalizeBase(String(value ?? ""));
}
function extractChoseongText(value) {
  const raw = String(value ?? "");
  let result = "";
  for (const char of raw) {
    const code = char.charCodeAt(0);
    if (code >= HANGUL_START && code <= HANGUL_END) {
      const index = Math.floor((code - HANGUL_START) / HANGUL_CYCLE);
      result += CHOSEONG[index] ?? "";
      continue;
    }
    if (code >= 12593 && code <= 12622) {
      result += char;
      continue;
    }
    if (/[\da-z]/i.test(char)) {
      result += char.toLowerCase();
    }
  }
  return normalizeBase(result);
}
function matchesKoreanSearch(targets, query) {
  const rawQuery = String(query ?? "");
  const normalizedQuery = normalizeKoreanSearchText(rawQuery);
  if (!normalizedQuery) return true;
  const compactRawQuery = rawQuery.replace(SEARCH_SEPARATOR_PATTERN, "");
  const choseongQuery = extractChoseongText(rawQuery);
  const isChoseongQuery = CHOSEONG_PATTERN.test(compactRawQuery);
  return targets.some((target) => {
    const normalizedTarget = normalizeKoreanSearchText(target);
    if (normalizedTarget.includes(normalizedQuery)) {
      return true;
    }
    if (!isChoseongQuery || !choseongQuery) {
      return false;
    }
    return extractChoseongText(target).includes(choseongQuery);
  });
}

// server/pii-security.ts
import crypto from "crypto";
var PII_ENVELOPE_KIND = "crm.pii.envelope";
var PII_ENVELOPE_VERSION_V1 = 1;
var PII_ENVELOPE_VERSION_V2 = 2;
var PII_ENVELOPE_ALGORITHM = "aes-256-gcm";
var STORAGE_PII_FIELDS = {
  users: ["email", "phone"],
  customers: ["email", "phone", "notes"],
  contacts: ["name", "email", "phone"],
  deals: ["phone", "email", "billingAccountNumber", "notes"],
  payments: ["notes"],
  systemLogs: ["loginId", "userName", "ipAddress", "userAgent", "details"],
  contracts: ["userIdentifier", "notes"],
  refunds: ["userIdentifier", "account"],
  keeps: ["userIdentifier"],
  deposits: ["depositorName", "notes"]
};
var RAW_TABLE_PII_COLUMNS = {
  users: ["email", "phone"],
  customers: ["email", "phone", "notes"],
  contacts: ["name", "email", "phone"],
  deals: ["phone", "email", "billing_account_number", "notes"],
  payments: ["notes"],
  system_logs: ["login_id", "user_name", "ip_address", "user_agent", "details"],
  contracts: ["user_identifier", "notes"],
  refunds: ["user_identifier", "account"],
  keeps: ["user_identifier"],
  deposits: ["depositor_name", "notes"],
  customer_counselings: ["content"],
  customer_change_histories: ["before_data", "after_data"],
  customer_files: ["file_name", "original_file_name", "file_data", "note"]
};
function getPiiEncryptionSecret() {
  const value = String(process.env.PII_ENCRYPTION_KEY || "").trim();
  return value || null;
}
function deriveEncryptionKey(secret, salt) {
  return crypto.scryptSync(secret, salt, 32);
}
var cachedSecretForStaticKey = null;
var cachedStaticKey = null;
function getStaticEncryptionKey(secret) {
  if (cachedStaticKey && cachedSecretForStaticKey === secret) {
    return cachedStaticKey;
  }
  cachedSecretForStaticKey = secret;
  cachedStaticKey = crypto.createHash("sha256").update(secret, "utf8").digest();
  return cachedStaticKey;
}
function requireBufferFromBase64(value, label) {
  try {
    return Buffer.from(value, "base64");
  } catch {
    throw new Error(`Invalid encrypted PII ${label}.`);
  }
}
function isPiiEnvelopeV1(value) {
  if (!value || typeof value !== "object") return false;
  const envelope = value;
  return envelope.kind === PII_ENVELOPE_KIND && envelope.version === PII_ENVELOPE_VERSION_V1 && envelope.algorithm === PII_ENVELOPE_ALGORITHM && typeof envelope.salt === "string" && typeof envelope.iv === "string" && typeof envelope.tag === "string" && typeof envelope.ciphertext === "string";
}
function isPiiEnvelopeV2(value) {
  if (!value || typeof value !== "object") return false;
  const envelope = value;
  return envelope.kind === PII_ENVELOPE_KIND && envelope.version === PII_ENVELOPE_VERSION_V2 && envelope.algorithm === PII_ENVELOPE_ALGORITHM && typeof envelope.iv === "string" && typeof envelope.tag === "string" && typeof envelope.ciphertext === "string";
}
function isPiiEnvelope(value) {
  return isPiiEnvelopeV1(value) || isPiiEnvelopeV2(value);
}
function isPiiEncryptionConfigured() {
  return Boolean(getPiiEncryptionSecret());
}
function assertPiiEncryptionReadyForProduction() {
  if (process.env.NODE_ENV === "production" && !isPiiEncryptionConfigured()) {
    throw new Error("PII_ENCRYPTION_KEY must be set in production.");
  }
}
function serializePiiValue(plaintext) {
  if (plaintext === "") {
    return { stored: plaintext, encrypted: false };
  }
  const secret = getPiiEncryptionSecret();
  if (!secret) {
    return { stored: plaintext, encrypted: false };
  }
  const iv = crypto.randomBytes(12);
  const key = getStaticEncryptionKey(secret);
  const cipher = crypto.createCipheriv(PII_ENVELOPE_ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const envelope = {
    kind: PII_ENVELOPE_KIND,
    version: PII_ENVELOPE_VERSION_V2,
    algorithm: PII_ENVELOPE_ALGORITHM,
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64")
  };
  return {
    stored: JSON.stringify(envelope),
    encrypted: true
  };
}
function deserializePiiValue(stored) {
  if (!stored) {
    return { plaintext: stored, encrypted: false };
  }
  let parsed;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return { plaintext: stored, encrypted: false };
  }
  if (!isPiiEnvelope(parsed)) {
    return { plaintext: stored, encrypted: false };
  }
  const secret = getPiiEncryptionSecret();
  if (!secret) {
    throw new Error("PII_ENCRYPTION_KEY is required to decrypt this value.");
  }
  const iv = requireBufferFromBase64(parsed.iv, "iv");
  const tag = requireBufferFromBase64(parsed.tag, "tag");
  const ciphertext = requireBufferFromBase64(parsed.ciphertext, "ciphertext");
  const key = isPiiEnvelopeV1(parsed) ? deriveEncryptionKey(secret, requireBufferFromBase64(parsed.salt, "salt")) : getStaticEncryptionKey(secret);
  const decipher = crypto.createDecipheriv(PII_ENVELOPE_ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  return {
    plaintext,
    encrypted: true
  };
}
function encryptNullableText(value) {
  if (value === null || value === void 0) return value;
  if (typeof value !== "string") return value;
  return serializePiiValue(value).stored;
}
function decryptNullableText(value) {
  if (value === null || value === void 0) return value;
  if (typeof value !== "string") return value;
  return deserializePiiValue(value).plaintext;
}
function encryptRecordFields(record, fields) {
  const next = { ...record };
  for (const field of fields) {
    if (!(field in next)) continue;
    next[field] = encryptNullableText(next[field]);
  }
  return next;
}
function decryptRecordFields(record, fields) {
  const next = { ...record };
  for (const field of fields) {
    if (!(field in next)) continue;
    next[field] = decryptNullableText(next[field]);
  }
  return next;
}

// server/storage.ts
function normalizeCompactText(value) {
  return String(value || "").replace(/\s+/g, "").trim();
}
var USER_PII_FIELDS = [...STORAGE_PII_FIELDS.users];
var CUSTOMER_PII_FIELDS = [...STORAGE_PII_FIELDS.customers];
var CONTACT_PII_FIELDS = [...STORAGE_PII_FIELDS.contacts];
var DEAL_PII_FIELDS = [...STORAGE_PII_FIELDS.deals];
var PAYMENT_PII_FIELDS = [...STORAGE_PII_FIELDS.payments];
var SYSTEM_LOG_PII_FIELDS = [...STORAGE_PII_FIELDS.systemLogs];
var CONTRACT_PII_FIELDS = [...STORAGE_PII_FIELDS.contracts];
var REFUND_PII_FIELDS = [...STORAGE_PII_FIELDS.refunds];
var KEEP_PII_FIELDS = [...STORAGE_PII_FIELDS.keeps];
var DEPOSIT_PII_FIELDS = [...STORAGE_PII_FIELDS.deposits];
function encryptPiiRow(row, fields) {
  return encryptRecordFields(row, fields);
}
function decryptPiiRow(row, fields) {
  return decryptRecordFields(row, fields);
}
var DatabaseStorage = class {
  async getUsers() {
    const results = await db.select().from(users).orderBy(desc(users.createdAt));
    return results.map((row) => decryptPiiRow(row, USER_PII_FIELDS));
  }
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ? decryptPiiRow(user, USER_PII_FIELDS) : void 0;
  }
  async getUserByLoginId(loginId) {
    const [user] = await db.select().from(users).where(eq(users.loginId, loginId));
    return user ? decryptPiiRow(user, USER_PII_FIELDS) : void 0;
  }
  async createUser(user) {
    const [created] = await db.insert(users).values(encryptPiiRow(user, USER_PII_FIELDS)).returning();
    return decryptPiiRow(created, USER_PII_FIELDS);
  }
  async updateUser(id, user) {
    const [updated] = await db.update(users).set(encryptPiiRow(user, USER_PII_FIELDS)).where(eq(users.id, id)).returning();
    return updated ? decryptPiiRow(updated, USER_PII_FIELDS) : void 0;
  }
  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id));
  }
  async getCustomers() {
    const results = await db.select().from(customers).orderBy(desc(customers.createdAt));
    return results.map((row) => decryptPiiRow(row, CUSTOMER_PII_FIELDS));
  }
  async getCustomer(id) {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer ? decryptPiiRow(customer, CUSTOMER_PII_FIELDS) : void 0;
  }
  async createCustomer(customer) {
    const [created] = await db.insert(customers).values(encryptPiiRow(customer, CUSTOMER_PII_FIELDS)).returning();
    return decryptPiiRow(created, CUSTOMER_PII_FIELDS);
  }
  async updateCustomer(id, customer) {
    const [updated] = await db.update(customers).set(encryptPiiRow(customer, CUSTOMER_PII_FIELDS)).where(eq(customers.id, id)).returning();
    return updated ? decryptPiiRow(updated, CUSTOMER_PII_FIELDS) : void 0;
  }
  async deleteCustomer(id) {
    await db.delete(activities).where(eq(activities.customerId, id));
    await db.delete(deals).where(eq(deals.customerId, id));
    await db.delete(contacts).where(eq(contacts.customerId, id));
    await db.delete(customers).where(eq(customers.id, id));
  }
  async getContacts(customerId) {
    if (customerId) {
      const results2 = await db.select().from(contacts).where(eq(contacts.customerId, customerId));
      return results2.map((row) => decryptPiiRow(row, CONTACT_PII_FIELDS));
    }
    const results = await db.select().from(contacts);
    return results.map((row) => decryptPiiRow(row, CONTACT_PII_FIELDS));
  }
  async getContact(id) {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact ? decryptPiiRow(contact, CONTACT_PII_FIELDS) : void 0;
  }
  async createContact(contact) {
    const [created] = await db.insert(contacts).values(encryptPiiRow(contact, CONTACT_PII_FIELDS)).returning();
    return decryptPiiRow(created, CONTACT_PII_FIELDS);
  }
  async updateContact(id, contact) {
    const [updated] = await db.update(contacts).set(encryptPiiRow(contact, CONTACT_PII_FIELDS)).where(eq(contacts.id, id)).returning();
    return updated ? decryptPiiRow(updated, CONTACT_PII_FIELDS) : void 0;
  }
  async deleteContact(id) {
    await db.delete(contacts).where(eq(contacts.id, id));
  }
  async getDeals() {
    const results = await db.select().from(deals).orderBy(desc(deals.createdAt));
    return results.map((row) => decryptPiiRow(row, DEAL_PII_FIELDS));
  }
  async getDeal(id) {
    const [deal] = await db.select().from(deals).where(eq(deals.id, id));
    return deal ? decryptPiiRow(deal, DEAL_PII_FIELDS) : void 0;
  }
  async createDeal(deal) {
    const [created] = await db.insert(deals).values(encryptPiiRow(deal, DEAL_PII_FIELDS)).returning();
    return decryptPiiRow(created, DEAL_PII_FIELDS);
  }
  async updateDeal(id, deal) {
    const [updated] = await db.update(deals).set(encryptPiiRow(deal, DEAL_PII_FIELDS)).where(eq(deals.id, id)).returning();
    return updated ? decryptPiiRow(updated, DEAL_PII_FIELDS) : void 0;
  }
  async deleteDeal(id) {
    await db.delete(activities).where(eq(activities.dealId, id));
    await db.delete(deals).where(eq(deals.id, id));
  }
  async getActivities() {
    return db.select().from(activities).orderBy(desc(activities.createdAt));
  }
  async getActivity(id) {
    const [activity] = await db.select().from(activities).where(eq(activities.id, id));
    return activity;
  }
  async createActivity(activity) {
    const [created] = await db.insert(activities).values(activity).returning();
    return created;
  }
  async deleteActivity(id) {
    await db.delete(activities).where(eq(activities.id, id));
  }
  async getStats() {
    const [customerCount] = await db.select({ count: sql2`count(*)` }).from(customers);
    const [dealStats] = await db.select({
      count: sql2`count(*)`,
      totalValue: sql2`coalesce(sum(${deals.value}), 0)`,
      wonDeals: sql2`count(*) filter (where ${deals.stage} = 'closed_won')`
    }).from(deals);
    return {
      totalCustomers: Number(customerCount?.count || 0),
      totalDeals: Number(dealStats?.count || 0),
      totalValue: Number(dealStats?.totalValue || 0),
      wonDeals: Number(dealStats?.wonDeals || 0)
    };
  }
  async getPayments() {
    const results = await db.select().from(payments).orderBy(desc(payments.depositDate));
    return results.map((row) => decryptPiiRow(row, PAYMENT_PII_FIELDS));
  }
  async getPayment(id) {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment ? decryptPiiRow(payment, PAYMENT_PII_FIELDS) : void 0;
  }
  async getPaymentByContractId(contractId) {
    const [payment] = await db.select().from(payments).where(eq(payments.contractId, contractId));
    return payment ? decryptPiiRow(payment, PAYMENT_PII_FIELDS) : void 0;
  }
  async createPayment(payment) {
    const [created] = await db.insert(payments).values(encryptPiiRow(payment, PAYMENT_PII_FIELDS)).returning();
    return decryptPiiRow(created, PAYMENT_PII_FIELDS);
  }
  async updatePayment(id, payment) {
    const [updated] = await db.update(payments).set(encryptPiiRow(payment, PAYMENT_PII_FIELDS)).where(eq(payments.id, id)).returning();
    return updated ? decryptPiiRow(updated, PAYMENT_PII_FIELDS) : void 0;
  }
  async updatePaymentByContractId(contractId, payment) {
    const [updated] = await db.update(payments).set(encryptPiiRow(payment, PAYMENT_PII_FIELDS)).where(eq(payments.contractId, contractId)).returning();
    return updated ? decryptPiiRow(updated, PAYMENT_PII_FIELDS) : void 0;
  }
  async deletePayment(id) {
    await db.delete(payments).where(eq(payments.id, id));
  }
  async getSystemLogs() {
    const results = await db.select().from(systemLogs).orderBy(desc(systemLogs.createdAt));
    return results.map((row) => decryptPiiRow(row, SYSTEM_LOG_PII_FIELDS));
  }
  async createSystemLog(log2) {
    const [created] = await db.insert(systemLogs).values(encryptPiiRow(log2, SYSTEM_LOG_PII_FIELDS)).returning();
    return decryptPiiRow(created, SYSTEM_LOG_PII_FIELDS);
  }
  async getProducts() {
    return db.select().from(products).orderBy(desc(products.createdAt));
  }
  async getProduct(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  async createProduct(product) {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }
  async updateProduct(id, product) {
    const [updated] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updated;
  }
  async deleteProduct(id) {
    await db.delete(products).where(eq(products.id, id));
  }
  async getProductRateHistories(productId) {
    if (productId) {
      return db.select().from(productRateHistories).where(eq(productRateHistories.productId, productId)).orderBy(desc(productRateHistories.effectiveFrom), desc(productRateHistories.createdAt));
    }
    return db.select().from(productRateHistories).orderBy(desc(productRateHistories.effectiveFrom), desc(productRateHistories.createdAt));
  }
  async createProductRateHistory(history) {
    const [created] = await db.insert(productRateHistories).values(history).returning();
    return created;
  }
  async getContracts() {
    const results = await db.select().from(contracts).orderBy(desc(contracts.contractDate));
    return results.map((row) => decryptPiiRow(row, CONTRACT_PII_FIELDS));
  }
  async getContractsPaged(params) {
    const page = Math.max(1, Math.floor(Number(params.page) || 1));
    const pageSize = Math.min(200, Math.max(1, Math.floor(Number(params.pageSize) || 10)));
    const offset = (page - 1) * pageSize;
    const sort = params.sort || "contractDateDesc";
    const search = String(params.search || "").trim();
    const contractNumber = String(params.contractNumber || "").trim();
    const managerName = String(params.managerName || "").trim();
    const customerName = String(params.customerName || "").trim();
    const productCategory = String(params.productCategory || "").trim();
    const paymentMethod = String(params.paymentMethod || "").trim();
    const filters = [];
    if (managerName) {
      filters.push(eq(contracts.managerName, managerName));
    }
    if (contractNumber) {
      filters.push(eq(contracts.contractNumber, contractNumber));
    }
    if (customerName) {
      filters.push(eq(contracts.customerName, customerName));
    }
    if (paymentMethod) {
      const normalizedPayment = normalizeCompactText(paymentMethod);
      if (normalizedPayment === "\uC785\uAE08\uC608\uC815" || normalizedPayment === "\uC785\uAE08\uC804") {
        filters.push(or(eq(contracts.paymentMethod, "\uC785\uAE08\uC608\uC815"), eq(contracts.paymentMethod, "\uC785\uAE08 \uC804"), eq(contracts.paymentMethod, "\uC785\uAE08\uC804")));
      } else if (normalizedPayment === "\uC785\uAE08\uC644\uB8CC" || normalizedPayment === "\uC785\uAE08\uD655\uC778") {
        filters.push(
          or(
            eq(contracts.paymentMethod, "\uC785\uAE08\uC644\uB8CC"),
            eq(contracts.paymentMethod, "\uC785\uAE08\uD655\uC778"),
            eq(contracts.paymentMethod, "\uD558\uB098"),
            eq(contracts.paymentMethod, "\uAD6D\uBBFC"),
            eq(contracts.paymentMethod, "\uB18D\uD611"),
            eq(contracts.paymentMethod, "\uD558\uB098\uC740\uD589"),
            eq(contracts.paymentMethod, "\uAD6D\uBBFC\uC740\uD589"),
            eq(contracts.paymentMethod, "\uB18D\uD611\uC740\uD589")
          )
        );
      } else if (normalizedPayment === "\uD658\uBD88\uC694\uCCAD") {
        filters.push(
          or(
            eq(contracts.paymentMethod, "\uD658\uBD88\uC694\uCCAD"),
            eq(contracts.paymentMethod, "\uD658\uBD88\uCC98\uB9AC"),
            eq(contracts.paymentMethod, "\uD658\uBD88\uB4F1\uB85D")
          )
        );
      } else if (normalizedPayment === "\uC801\uB9BD\uAE08\uC0AC\uC6A9") {
        filters.push(
          or(
            eq(contracts.paymentMethod, "\uC801\uB9BD\uAE08 \uB4F1\uB85D"),
            eq(contracts.paymentMethod, "\uC801\uB9BD\uAE08\uB4F1\uB85D"),
            eq(contracts.paymentMethod, "\uC801\uB9BD"),
            eq(contracts.paymentMethod, "\uC801\uB9BD\uAE08"),
            eq(contracts.paymentMethod, "\uC801\uB9BD\uAE08\uC0AC\uC6A9")
          )
        );
      } else if (normalizedPayment === "\uAE30\uD0C0") {
        filters.push(or(eq(contracts.paymentMethod, "\uAE30\uD0C0"), eq(contracts.paymentMethod, "\uCCB4\uD06C")));
      } else {
        filters.push(eq(contracts.paymentMethod, paymentMethod));
      }
    }
    if (params.startDate) {
      filters.push(gte(contracts.contractDate, params.startDate));
    }
    if (params.endDate) {
      filters.push(lte(contracts.contractDate, params.endDate));
    }
    if (productCategory) {
      const productRows = await db.select({ name: products.name }).from(products).where(eq(products.category, productCategory));
      const productNames = productRows.map((row) => String(row.name || "").trim()).filter(Boolean);
      if (productNames.length === 0) {
        return { items: [], total: 0, page, pageSize };
      }
      const categoryFilters = productNames.map(
        (name) => ilike(contracts.products, `%${name.replace(/[%_]/g, "\\$&")}%`)
      );
      filters.push(categoryFilters.length === 1 ? categoryFilters[0] : or(...categoryFilters));
    }
    const whereClause = filters.length > 0 ? and(...filters) : void 0;
    const orderByClause = sort === "contractDateAsc" ? [asc(contracts.contractDate), desc(contracts.createdAt)] : sort === "customerNameAsc" ? [asc(contracts.customerName), desc(contracts.contractDate), desc(contracts.createdAt)] : [desc(contracts.contractDate), desc(contracts.createdAt)];
    if (search) {
      const rows = whereClause ? await db.select().from(contracts).where(whereClause).orderBy(...orderByClause) : await db.select().from(contracts).orderBy(...orderByClause);
      const decryptedRows = rows.map((row) => decryptPiiRow(row, CONTRACT_PII_FIELDS));
      const filteredRows = decryptedRows.filter(
        (row) => matchesKoreanSearch(
          [row.contractNumber, row.customerName, row.userIdentifier, row.managerName, row.products],
          search
        )
      );
      return {
        items: filteredRows.slice(offset, offset + pageSize),
        total: filteredRows.length,
        page,
        pageSize
      };
    }
    const totalRows = whereClause ? await db.select({ total: count() }).from(contracts).where(whereClause) : await db.select({ total: count() }).from(contracts);
    const items = whereClause ? await db.select().from(contracts).where(whereClause).orderBy(...orderByClause).limit(pageSize).offset(offset) : await db.select().from(contracts).orderBy(...orderByClause).limit(pageSize).offset(offset);
    return {
      items: items.map((row) => decryptPiiRow(row, CONTRACT_PII_FIELDS)),
      total: Number(totalRows[0]?.total || 0),
      page,
      pageSize
    };
  }
  async getContract(id) {
    const [contract] = await db.select().from(contracts).where(eq(contracts.id, id));
    return contract ? decryptPiiRow(contract, CONTRACT_PII_FIELDS) : void 0;
  }
  async getRefundContractsBySource(sourceContractId, sourceItemId) {
    const normalizedSourceContractId = String(sourceContractId || "").trim();
    if (!normalizedSourceContractId) return [];
    const filters = [
      eq(contracts.contractType, "refund"),
      eq(contracts.sourceContractId, normalizedSourceContractId)
    ];
    const normalizedSourceItemId = String(sourceItemId || "").trim();
    if (normalizedSourceItemId) {
      filters.push(eq(contracts.sourceItemId, normalizedSourceItemId));
    }
    const results = await db.select().from(contracts).where(and(...filters)).orderBy(desc(contracts.contractDate), desc(contracts.createdAt));
    return results.map((row) => decryptPiiRow(row, CONTRACT_PII_FIELDS));
  }
  async createContract(contract) {
    const [created] = await db.insert(contracts).values(encryptPiiRow(contract, CONTRACT_PII_FIELDS)).returning();
    return decryptPiiRow(created, CONTRACT_PII_FIELDS);
  }
  async updateContract(id, contract) {
    const [updated] = await db.update(contracts).set(encryptPiiRow(contract, CONTRACT_PII_FIELDS)).where(eq(contracts.id, id)).returning();
    return updated ? decryptPiiRow(updated, CONTRACT_PII_FIELDS) : void 0;
  }
  async deleteContract(id) {
    await db.transaction(async (tx) => {
      await tx.delete(payments).where(eq(payments.contractId, id));
      await tx.delete(deposits).where(eq(deposits.contractId, id));
      await tx.delete(refunds).where(eq(refunds.contractId, id));
      await tx.delete(keeps).where(eq(keeps.contractId, id));
      await tx.delete(contracts).where(eq(contracts.id, id));
    });
  }
  async getContractsWithFinancials() {
    const allContracts = (await db.select().from(contracts).orderBy(desc(contracts.contractDate))).map(
      (row) => decryptPiiRow(row, CONTRACT_PII_FIELDS)
    );
    const allRefunds = await db.select({
      contractId: refunds.contractId,
      amount: refunds.amount,
      refundDate: refunds.refundDate
    }).from(refunds);
    const allKeeps = await db.select({
      contractId: keeps.contractId,
      amount: keeps.amount,
      keepDate: keeps.keepDate
    }).from(keeps);
    const allProducts = await db.select().from(products);
    const allProductRateHistories = await db.select().from(productRateHistories);
    const productMap = /* @__PURE__ */ new Map();
    for (const p of allProducts) {
      productMap.set(p.name, p);
    }
    const productHistoryMap = /* @__PURE__ */ new Map();
    for (const history of allProductRateHistories) {
      const key = (history.productName || "").trim();
      if (!key) continue;
      if (!productHistoryMap.has(key)) {
        productHistoryMap.set(key, []);
      }
      productHistoryMap.get(key).push(history);
    }
    Array.from(productHistoryMap.values()).forEach((historyList) => {
      historyList.sort((a, b) => {
        const effectiveDiff = new Date(b.effectiveFrom).getTime() - new Date(a.effectiveFrom).getTime();
        if (effectiveDiff !== 0) return effectiveDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    });
    const resolveProductSnapshot = (productName, contractDate) => {
      const normalizedName = (productName || "").trim();
      if (!normalizedName) return void 0;
      const historyList = productHistoryMap.get(normalizedName) ?? [];
      if (historyList.length > 0) {
        const contractTime = contractDate ? new Date(contractDate).getTime() : Number.NaN;
        if (!Number.isNaN(contractTime)) {
          const matched = historyList.find((history) => new Date(history.effectiveFrom).getTime() <= contractTime);
          if (matched) return matched;
          return historyList[historyList.length - 1];
        }
        return historyList[0];
      }
      return productMap.get(normalizedName);
    };
    const refundMap = /* @__PURE__ */ new Map();
    for (const r of allRefunds) {
      const existing = refundMap.get(r.contractId) || { total: 0, lastDate: null, count: 0 };
      existing.total += r.amount;
      existing.count += 1;
      const rDate = new Date(r.refundDate).toISOString();
      if (!existing.lastDate || rDate > existing.lastDate) {
        existing.lastDate = rDate;
      }
      refundMap.set(r.contractId, existing);
    }
    const keepMap = /* @__PURE__ */ new Map();
    for (const k of allKeeps) {
      const existing = keepMap.get(k.contractId) || { total: 0, lastDate: null, count: 0 };
      existing.total += k.amount;
      existing.count += 1;
      const kDate = new Date(k.keepDate).toISOString();
      if (!existing.lastDate || kDate > existing.lastDate) {
        existing.lastDate = kDate;
      }
      keepMap.set(k.contractId, existing);
    }
    return allContracts.map((c) => {
      let workerValue = c.worker ?? "";
      let workCostValue = c.workCost ?? 0;
      if (!workerValue && c.products) {
        const productNames = c.products.split(",").map((n) => n.trim());
        const workers = productNames.map((name) => resolveProductSnapshot(name, c.contractDate)?.worker).filter((w) => !!w);
        workerValue = Array.from(new Set(workers)).join(", ");
      }
      return {
        ...c,
        worker: workerValue,
        workCost: workCostValue,
        totalRefund: refundMap.get(c.id)?.total ?? 0,
        lastRefundDate: refundMap.get(c.id)?.lastDate ?? null,
        refundCount: refundMap.get(c.id)?.count ?? 0,
        totalKeep: keepMap.get(c.id)?.total ?? 0,
        lastKeepDate: keepMap.get(c.id)?.lastDate ?? null,
        keepCount: keepMap.get(c.id)?.count ?? 0
      };
    });
  }
  async getAllRefunds() {
    const result = await db.select({
      id: refunds.id,
      contractId: refunds.contractId,
      itemId: refunds.itemId,
      amount: refunds.amount,
      quantity: refunds.quantity,
      refundDays: refunds.refundDays,
      account: refunds.account,
      slot: refunds.slot,
      reason: refunds.reason,
      worker: refunds.worker,
      previousPaymentMethod: refunds.previousPaymentMethod,
      refundStatus: refunds.refundStatus,
      refundDate: refunds.refundDate,
      createdBy: refunds.createdBy,
      createdAt: refunds.createdAt,
      contractNumber: contracts.contractNumber,
      customerName: contracts.customerName,
      contractDate: contracts.contractDate,
      userIdentifier: sql2`coalesce(${refunds.userIdentifier}, ${contracts.userIdentifier})`,
      productName: sql2`coalesce(${refunds.productName}, ${contracts.products})`,
      products: sql2`coalesce(${refunds.productName}, ${contracts.products})`,
      days: sql2`case when ${refunds.itemId} is not null then ${refunds.days} else ${contracts.days} end`,
      addQuantity: sql2`case when ${refunds.itemId} is not null then ${refunds.addQuantity} else ${contracts.addQuantity} end`,
      extendQuantity: sql2`case when ${refunds.itemId} is not null then ${refunds.extendQuantity} else ${contracts.extendQuantity} end`,
      managerName: contracts.managerName,
      contractCost: sql2`case when ${refunds.targetAmount} > 0 then ${refunds.targetAmount} else ${contracts.cost} end`,
      targetAmount: refunds.targetAmount
    }).from(refunds).leftJoin(contracts, eq(refunds.contractId, contracts.id)).orderBy(desc(refunds.refundDate));
    return result.map((r) => {
      const decrypted = decryptPiiRow(r, REFUND_PII_FIELDS);
      return {
        ...decrypted,
        contractNumber: decrypted.contractNumber ?? "",
        customerName: decrypted.customerName ?? "",
        userIdentifier: decrypted.userIdentifier ?? null,
        products: decrypted.products ?? null,
        days: decrypted.days ?? null,
        addQuantity: decrypted.addQuantity ?? null,
        extendQuantity: decrypted.extendQuantity ?? null,
        managerName: decrypted.managerName ?? null,
        contractCost: decrypted.contractCost ?? null,
        itemId: decrypted.itemId ?? null,
        targetAmount: decrypted.targetAmount ?? null,
        previousPaymentMethod: decrypted.previousPaymentMethod ?? null,
        refundStatus: decrypted.refundStatus ?? null,
        contractDate: decrypted.contractDate ?? null
      };
    });
  }
  async getRefundsByContract(contractId, itemId) {
    const whereClause = itemId ? and(eq(refunds.contractId, contractId), eq(refunds.itemId, itemId)) : eq(refunds.contractId, contractId);
    const results = await db.select().from(refunds).where(whereClause).orderBy(desc(refunds.refundDate));
    return results.map((row) => decryptPiiRow(row, REFUND_PII_FIELDS));
  }
  async getRefund(id) {
    const [refund] = await db.select().from(refunds).where(eq(refunds.id, id));
    return refund ? decryptPiiRow(refund, REFUND_PII_FIELDS) : void 0;
  }
  async createRefund(refund) {
    const [created] = await db.insert(refunds).values(encryptPiiRow(refund, REFUND_PII_FIELDS)).returning();
    return decryptPiiRow(created, REFUND_PII_FIELDS);
  }
  async updateRefundStatuses(ids, refundStatus) {
    const normalizedIds = Array.from(new Set(ids.map((id) => String(id || "").trim()).filter(Boolean)));
    if (normalizedIds.length === 0) {
      return 0;
    }
    const updatedRows = await db.update(refunds).set({ refundStatus }).where(inArray(refunds.id, normalizedIds)).returning({ id: refunds.id });
    return updatedRows.length;
  }
  async deleteRefund(id) {
    await db.delete(refunds).where(eq(refunds.id, id));
  }
  async getAllKeeps() {
    const result = await db.select({
      id: keeps.id,
      contractId: keeps.contractId,
      itemId: keeps.itemId,
      amount: keeps.amount,
      keepDate: keeps.keepDate,
      reason: keeps.reason,
      worker: keeps.worker,
      previousPaymentMethod: keeps.previousPaymentMethod,
      keepStatus: keeps.keepStatus,
      decisionBy: keeps.decisionBy,
      decisionAt: keeps.decisionAt,
      createdBy: keeps.createdBy,
      createdAt: keeps.createdAt,
      contractNumber: contracts.contractNumber,
      customerName: contracts.customerName,
      userIdentifier: sql2`coalesce(${keeps.userIdentifier}, ${contracts.userIdentifier})`,
      productName: sql2`coalesce(${keeps.productName}, ${contracts.products})`,
      products: sql2`coalesce(${keeps.productName}, ${contracts.products})`,
      days: sql2`case when ${keeps.itemId} is not null then ${keeps.days} else ${contracts.days} end`,
      addQuantity: sql2`case when ${keeps.itemId} is not null then ${keeps.addQuantity} else ${contracts.addQuantity} end`,
      extendQuantity: sql2`case when ${keeps.itemId} is not null then ${keeps.extendQuantity} else ${contracts.extendQuantity} end`,
      managerName: contracts.managerName,
      contractCost: sql2`case when ${keeps.targetAmount} > 0 then ${keeps.targetAmount} else ${contracts.cost} end`,
      targetAmount: keeps.targetAmount
    }).from(keeps).leftJoin(contracts, eq(keeps.contractId, contracts.id)).orderBy(desc(keeps.keepDate));
    return result.map((r) => {
      const decrypted = decryptPiiRow(r, KEEP_PII_FIELDS);
      return {
        ...decrypted,
        contractNumber: decrypted.contractNumber ?? "",
        customerName: decrypted.customerName ?? "",
        userIdentifier: decrypted.userIdentifier ?? null,
        products: decrypted.products ?? null,
        days: decrypted.days ?? null,
        addQuantity: decrypted.addQuantity ?? null,
        extendQuantity: decrypted.extendQuantity ?? null,
        managerName: decrypted.managerName ?? null,
        contractCost: decrypted.contractCost ?? null,
        itemId: decrypted.itemId ?? null,
        targetAmount: decrypted.targetAmount ?? null,
        previousPaymentMethod: decrypted.previousPaymentMethod ?? null,
        keepStatus: decrypted.keepStatus ?? null,
        decisionBy: decrypted.decisionBy ?? null,
        decisionAt: decrypted.decisionAt ?? null
      };
    });
  }
  async getKeepsByContract(contractId, itemId) {
    const whereClause = itemId ? and(eq(keeps.contractId, contractId), eq(keeps.itemId, itemId)) : eq(keeps.contractId, contractId);
    const results = await db.select().from(keeps).where(whereClause).orderBy(desc(keeps.keepDate));
    return results.map((row) => decryptPiiRow(row, KEEP_PII_FIELDS));
  }
  async getKeep(id) {
    const [keep] = await db.select().from(keeps).where(eq(keeps.id, id));
    return keep ? decryptPiiRow(keep, KEEP_PII_FIELDS) : void 0;
  }
  async createKeep(keep) {
    const [created] = await db.insert(keeps).values(encryptPiiRow(keep, KEEP_PII_FIELDS)).returning();
    return decryptPiiRow(created, KEEP_PII_FIELDS);
  }
  async updateKeep(id, keep) {
    const [updated] = await db.update(keeps).set(encryptPiiRow(keep, KEEP_PII_FIELDS)).where(eq(keeps.id, id)).returning();
    return updated ? decryptPiiRow(updated, KEEP_PII_FIELDS) : void 0;
  }
  async deleteKeep(id) {
    await db.delete(keeps).where(eq(keeps.id, id));
  }
  async getRegionalManagementFees() {
    return db.select().from(regionalManagementFees).orderBy(desc(regionalManagementFees.feeDate), desc(regionalManagementFees.createdAt));
  }
  async getRegionalManagementFee(id) {
    const [fee] = await db.select().from(regionalManagementFees).where(eq(regionalManagementFees.id, id));
    return fee;
  }
  async createRegionalManagementFee(fee) {
    const [created] = await db.insert(regionalManagementFees).values(fee).returning();
    return created;
  }
  async updateRegionalManagementFee(id, fee) {
    const [updated] = await db.update(regionalManagementFees).set({ ...fee, updatedAt: /* @__PURE__ */ new Date() }).where(eq(regionalManagementFees.id, id)).returning();
    return updated;
  }
  async deleteRegionalManagementFee(id) {
    await db.delete(regionalManagementFees).where(eq(regionalManagementFees.id, id));
  }
  async getRegionalCustomerLists() {
    return db.select().from(regionalCustomerLists).orderBy(
      sql2`CASE ${regionalCustomerLists.tier}
          WHEN '1000' THEN 1
          WHEN '500' THEN 2
          WHEN '300' THEN 3
          WHEN '100' THEN 4
          ELSE 99
        END`,
      asc(regionalCustomerLists.sortOrder),
      asc(regionalCustomerLists.customerName)
    );
  }
  async getRegionalCustomerList(id) {
    const [item] = await db.select().from(regionalCustomerLists).where(eq(regionalCustomerLists.id, id));
    return item;
  }
  async createRegionalCustomerList(item) {
    const [created] = await db.insert(regionalCustomerLists).values(item).returning();
    return created;
  }
  async updateRegionalCustomerList(id, item) {
    const [updated] = await db.update(regionalCustomerLists).set({ ...item, updatedAt: /* @__PURE__ */ new Date() }).where(eq(regionalCustomerLists.id, id)).returning();
    return updated;
  }
  async deleteRegionalCustomerList(id) {
    await db.delete(regionalCustomerLists).where(eq(regionalCustomerLists.id, id));
  }
  async getDeposits() {
    const results = await db.select().from(deposits).orderBy(desc(deposits.depositDate), desc(deposits.createdAt));
    return results.map((row) => decryptPiiRow(row, DEPOSIT_PII_FIELDS));
  }
  async getDeposit(id) {
    const [deposit] = await db.select().from(deposits).where(eq(deposits.id, id));
    return deposit ? decryptPiiRow(deposit, DEPOSIT_PII_FIELDS) : void 0;
  }
  async getDepositByContractId(contractId) {
    const [deposit] = await db.select().from(deposits).where(eq(deposits.contractId, contractId)).orderBy(desc(deposits.confirmedAt), desc(deposits.createdAt)).limit(1);
    return deposit ? decryptPiiRow(deposit, DEPOSIT_PII_FIELDS) : void 0;
  }
  async createDeposit(deposit) {
    const [created] = await db.insert(deposits).values(encryptPiiRow(deposit, DEPOSIT_PII_FIELDS)).returning();
    return decryptPiiRow(created, DEPOSIT_PII_FIELDS);
  }
  async createDeposits(depositList) {
    if (depositList.length === 0) return [];
    const created = await db.insert(deposits).values(depositList.map((row) => encryptPiiRow(row, DEPOSIT_PII_FIELDS))).returning();
    return created.map((row) => decryptPiiRow(row, DEPOSIT_PII_FIELDS));
  }
  async updateDeposit(id, deposit) {
    const [updated] = await db.update(deposits).set(encryptPiiRow(deposit, DEPOSIT_PII_FIELDS)).where(eq(deposits.id, id)).returning();
    return updated ? decryptPiiRow(updated, DEPOSIT_PII_FIELDS) : void 0;
  }
  async deleteDeposit(id) {
    await db.delete(deposits).where(eq(deposits.id, id));
  }
  async getPagePermissions() {
    return db.select().from(pagePermissions);
  }
  async getPagePermissionsByUser(userId) {
    return db.select().from(pagePermissions).where(eq(pagePermissions.userId, userId));
  }
  async setPagePermissions(userId, pageKeys) {
    await db.delete(pagePermissions).where(eq(pagePermissions.userId, userId));
    if (pageKeys.length > 0) {
      await db.insert(pagePermissions).values(
        pageKeys.map((pageKey) => ({ userId, pageKey }))
      );
    }
  }
  async getSystemSettings() {
    return db.select().from(systemSettings);
  }
  async getSystemSetting(key) {
    const [setting] = await db.select().from(systemSettings).where(eq(systemSettings.settingKey, key));
    return setting;
  }
  async setSystemSetting(key, value) {
    const existing = await this.getSystemSetting(key);
    if (existing) {
      const [updated] = await db.update(systemSettings).set({ settingValue: value }).where(eq(systemSettings.settingKey, key)).returning();
      return updated;
    }
    const [created] = await db.insert(systemSettings).values({ settingKey: key, settingValue: value }).returning();
    return created;
  }
  async setSystemSettingsBulk(settings) {
    for (const [key, value] of Object.entries(settings)) {
      await this.setSystemSetting(key, value);
    }
  }
  async getDealTimelines(dealId) {
    return db.select().from(dealTimelines).where(eq(dealTimelines.dealId, dealId)).orderBy(desc(dealTimelines.createdAt));
  }
  async createDealTimeline(timeline) {
    const [created] = await db.insert(dealTimelines).values(timeline).returning();
    return created;
  }
  async deleteDealTimeline(id) {
    await db.delete(dealTimelines).where(eq(dealTimelines.id, id));
  }
  async getNotices() {
    return db.select().from(notices).orderBy(desc(notices.isPinned), desc(notices.createdAt));
  }
  async getNotice(id) {
    const [notice] = await db.select().from(notices).where(eq(notices.id, id));
    return notice;
  }
  async createNotice(notice) {
    const [created] = await db.insert(notices).values(notice).returning();
    return created;
  }
  async updateNotice(id, notice) {
    const [updated] = await db.update(notices).set({ ...notice, updatedAt: /* @__PURE__ */ new Date() }).where(eq(notices.id, id)).returning();
    return updated;
  }
  async deleteNotice(id) {
    await db.delete(notices).where(eq(notices.id, id));
  }
  async incrementNoticeViewCount(id) {
    await db.update(notices).set({ viewCount: sql2`${notices.viewCount} + 1` }).where(eq(notices.id, id));
  }
  async getBackups() {
    const results = await db.select({
      id: databaseBackups.id,
      label: databaseBackups.label,
      createdByName: databaseBackups.createdByName,
      createdByUserId: databaseBackups.createdByUserId,
      tableCounts: databaseBackups.tableCounts,
      sizeBytes: databaseBackups.sizeBytes,
      createdAt: databaseBackups.createdAt
    }).from(databaseBackups).orderBy(desc(databaseBackups.createdAt));
    return results;
  }
  async getBackup(id) {
    const [backup] = await db.select().from(databaseBackups).where(eq(databaseBackups.id, id));
    return backup;
  }
  async createBackup(backup) {
    const [created] = await db.insert(databaseBackups).values(backup).returning();
    return created;
  }
  async deleteBackup(id) {
    await db.delete(databaseBackups).where(eq(databaseBackups.id, id));
  }
  async getImportBatches() {
    return db.select().from(importBatches).orderBy(desc(importBatches.createdAt));
  }
  async getImportBatch(id) {
    const [batch] = await db.select().from(importBatches).where(eq(importBatches.id, id));
    return batch;
  }
  async createImportBatch(batch) {
    const [created] = await db.insert(importBatches).values(batch).returning();
    return created;
  }
  async updateImportBatch(id, batch) {
    const [updated] = await db.update(importBatches).set(batch).where(eq(importBatches.id, id)).returning();
    return updated;
  }
  async deleteImportBatch(id) {
    await db.delete(importStagingRows).where(eq(importStagingRows.batchId, id));
    await db.delete(importBatches).where(eq(importBatches.id, id));
  }
  async getImportStagingRows(batchId) {
    return db.select().from(importStagingRows).where(eq(importStagingRows.batchId, batchId)).orderBy(importStagingRows.rowIndex);
  }
  async createImportStagingRows(rows) {
    if (rows.length === 0) return [];
    const created = await db.insert(importStagingRows).values(rows).returning();
    return created;
  }
  async deleteImportStagingRows(batchId) {
    await db.delete(importStagingRows).where(eq(importStagingRows.batchId, batchId));
  }
  async getImportMappings(userId) {
    if (userId) {
      return db.select().from(importMappings).where(eq(importMappings.userId, userId)).orderBy(desc(importMappings.createdAt));
    }
    return db.select().from(importMappings).orderBy(desc(importMappings.createdAt));
  }
  async createImportMapping(mapping) {
    const [created] = await db.insert(importMappings).values(mapping).returning();
    return created;
  }
  async deleteImportMapping(id) {
    await db.delete(importMappings).where(eq(importMappings.id, id));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
import bcrypt from "bcryptjs";

// shared/korean-business-days.ts
var KOREAN_PUBLIC_HOLIDAY_KEYS = /* @__PURE__ */ new Set([
  "2020-01-01",
  "2020-01-24",
  "2020-01-25",
  "2020-01-26",
  "2020-01-27",
  "2020-03-01",
  "2020-04-15",
  "2020-04-30",
  "2020-05-05",
  "2020-06-06",
  "2020-08-15",
  "2020-08-17",
  "2020-09-30",
  "2020-10-01",
  "2020-10-02",
  "2020-10-03",
  "2020-10-09",
  "2020-12-25",
  "2021-01-01",
  "2021-02-11",
  "2021-02-12",
  "2021-02-13",
  "2021-03-01",
  "2021-05-05",
  "2021-05-19",
  "2021-06-06",
  "2021-08-15",
  "2021-08-16",
  "2021-09-20",
  "2021-09-21",
  "2021-09-22",
  "2021-10-03",
  "2021-10-04",
  "2021-10-09",
  "2021-10-11",
  "2021-12-25",
  "2022-01-01",
  "2022-01-31",
  "2022-02-01",
  "2022-02-02",
  "2022-03-01",
  "2022-03-09",
  "2022-05-05",
  "2022-05-08",
  "2022-06-01",
  "2022-06-06",
  "2022-08-15",
  "2022-09-09",
  "2022-09-10",
  "2022-09-11",
  "2022-09-12",
  "2022-10-03",
  "2022-10-09",
  "2022-10-10",
  "2022-12-25",
  "2023-01-01",
  "2023-01-21",
  "2023-01-22",
  "2023-01-23",
  "2023-01-24",
  "2023-03-01",
  "2023-05-05",
  "2023-05-27",
  "2023-05-29",
  "2023-06-06",
  "2023-08-15",
  "2023-09-28",
  "2023-09-29",
  "2023-09-30",
  "2023-10-02",
  "2023-10-03",
  "2023-10-09",
  "2023-12-25",
  "2024-01-01",
  "2024-02-09",
  "2024-02-10",
  "2024-02-11",
  "2024-02-12",
  "2024-03-01",
  "2024-04-10",
  "2024-05-05",
  "2024-05-06",
  "2024-05-15",
  "2024-06-06",
  "2024-08-15",
  "2024-09-16",
  "2024-09-17",
  "2024-09-18",
  "2024-10-01",
  "2024-10-03",
  "2024-10-09",
  "2024-12-25",
  "2025-01-01",
  "2025-01-27",
  "2025-01-28",
  "2025-01-29",
  "2025-01-30",
  "2025-03-01",
  "2025-03-03",
  "2025-05-05",
  "2025-05-06",
  "2025-06-03",
  "2025-06-06",
  "2025-08-15",
  "2025-10-03",
  "2025-10-05",
  "2025-10-06",
  "2025-10-07",
  "2025-10-08",
  "2025-10-09",
  "2025-12-25",
  "2026-01-01",
  "2026-02-16",
  "2026-02-17",
  "2026-02-18",
  "2026-03-01",
  "2026-03-02",
  "2026-05-05",
  "2026-05-24",
  "2026-05-25",
  "2026-06-03",
  "2026-06-06",
  "2026-08-15",
  "2026-08-17",
  "2026-09-24",
  "2026-09-25",
  "2026-09-26",
  "2026-10-03",
  "2026-10-05",
  "2026-10-09",
  "2026-12-25",
  "2027-01-01",
  "2027-02-06",
  "2027-02-07",
  "2027-02-08",
  "2027-02-09",
  "2027-03-01",
  "2027-05-05",
  "2027-05-13",
  "2027-06-06",
  "2027-08-15",
  "2027-08-16",
  "2027-09-14",
  "2027-09-15",
  "2027-09-16",
  "2027-10-03",
  "2027-10-04",
  "2027-10-09",
  "2027-10-11",
  "2027-12-25",
  "2027-12-27",
  "2028-01-01",
  "2028-01-26",
  "2028-01-27",
  "2028-01-28",
  "2028-03-01",
  "2028-04-12",
  "2028-05-02",
  "2028-05-05",
  "2028-06-06",
  "2028-08-15",
  "2028-10-02",
  "2028-10-03",
  "2028-10-04",
  "2028-10-05",
  "2028-10-09",
  "2028-12-25",
  "2029-01-01",
  "2029-02-12",
  "2029-02-13",
  "2029-02-14",
  "2029-03-01",
  "2029-05-05",
  "2029-05-07",
  "2029-05-20",
  "2029-05-21",
  "2029-06-06",
  "2029-08-15",
  "2029-09-21",
  "2029-09-22",
  "2029-09-23",
  "2029-09-24",
  "2029-10-03",
  "2029-10-09",
  "2029-12-25",
  "2030-01-01",
  "2030-02-02",
  "2030-02-03",
  "2030-02-04",
  "2030-02-05",
  "2030-03-01",
  "2030-04-03",
  "2030-05-05",
  "2030-05-06",
  "2030-05-09",
  "2030-06-06",
  "2030-06-12",
  "2030-08-15",
  "2030-09-11",
  "2030-09-12",
  "2030-09-13",
  "2030-10-03",
  "2030-10-09",
  "2030-12-25",
  "2031-01-01",
  "2031-01-22",
  "2031-01-23",
  "2031-01-24",
  "2031-03-01",
  "2031-03-03",
  "2031-05-05",
  "2031-05-28",
  "2031-06-06",
  "2031-08-15",
  "2031-09-30",
  "2031-10-01",
  "2031-10-02",
  "2031-10-03",
  "2031-10-09",
  "2031-12-25",
  "2032-01-01",
  "2032-02-10",
  "2032-02-11",
  "2032-02-12",
  "2032-03-01",
  "2032-04-14",
  "2032-05-05",
  "2032-05-16",
  "2032-05-17",
  "2032-06-06",
  "2032-08-15",
  "2032-08-16",
  "2032-09-18",
  "2032-09-19",
  "2032-09-20",
  "2032-09-21",
  "2032-10-03",
  "2032-10-04",
  "2032-10-09",
  "2032-10-11",
  "2032-12-25",
  "2032-12-27",
  "2033-01-01",
  "2033-01-30",
  "2033-01-31",
  "2033-02-01",
  "2033-02-02",
  "2033-03-01",
  "2033-05-05",
  "2033-05-06",
  "2033-06-06",
  "2033-08-15",
  "2033-09-07",
  "2033-09-08",
  "2033-09-09",
  "2033-10-03",
  "2033-10-09",
  "2033-10-10",
  "2033-12-25",
  "2033-12-26",
  "2034-01-01",
  "2034-02-18",
  "2034-02-19",
  "2034-02-20",
  "2034-02-21",
  "2034-03-01",
  "2034-05-05",
  "2034-05-25",
  "2034-06-06",
  "2034-06-14",
  "2034-08-15",
  "2034-09-26",
  "2034-09-27",
  "2034-09-28",
  "2034-10-03",
  "2034-10-09",
  "2034-12-25",
  "2035-01-01",
  "2035-02-07",
  "2035-02-08",
  "2035-02-09",
  "2035-03-01",
  "2035-04-04",
  "2035-05-05",
  "2035-05-07",
  "2035-05-15",
  "2035-06-06",
  "2035-08-15",
  "2035-09-15",
  "2035-09-16",
  "2035-09-17",
  "2035-09-18",
  "2035-10-03",
  "2035-10-09",
  "2035-12-25"
]);
var KOREA_TIME_ZONE = "Asia/Seoul";
function buildKoreanDateFromKey(dateKey) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  const date = /* @__PURE__ */ new Date(`${dateKey}T12:00:00+09:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}
function getKoreanDateParts(value) {
  const date = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? buildKoreanDateFromKey(value) : new Date(value);
  if (!date || Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: KOREA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  if (!year || !month || !day) return null;
  return { year, month, day };
}
function getKoreanBusinessDateKey(value) {
  if (value === null || value === void 0 || value === "") return null;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    return value.trim();
  }
  const parts = getKoreanDateParts(value);
  if (!parts) return null;
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function normalizeToKoreanDateOnly(value) {
  const dateKey = getKoreanBusinessDateKey(value);
  return dateKey ? buildKoreanDateFromKey(dateKey) : null;
}
function isKoreanPublicHoliday(value) {
  const dateKey = getKoreanBusinessDateKey(value);
  return Boolean(dateKey && KOREAN_PUBLIC_HOLIDAY_KEYS.has(dateKey));
}
function isKoreanWeekend(value) {
  const normalized = normalizeToKoreanDateOnly(value);
  if (!normalized) return false;
  const dayOfWeek = normalized.getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}
function isKoreanBusinessDay(value) {
  const normalized = normalizeToKoreanDateOnly(value);
  if (!normalized) return false;
  return !isKoreanWeekend(normalized) && !isKoreanPublicHoliday(normalized);
}
function addKoreanBusinessDays(value, businessDayDelta) {
  const normalized = normalizeToKoreanDateOnly(value);
  if (!normalized) return null;
  const remainingDays = Math.trunc(Math.abs(businessDayDelta));
  if (remainingDays === 0) return normalized;
  const direction = businessDayDelta > 0 ? 1 : -1;
  let remaining = remainingDays;
  let cursor = normalized;
  while (remaining > 0) {
    const next = new Date(cursor);
    next.setUTCDate(next.getUTCDate() + direction);
    const nextNormalized = normalizeToKoreanDateOnly(next);
    if (!nextNormalized) return null;
    cursor = nextNormalized;
    if (!isKoreanBusinessDay(cursor)) continue;
    remaining -= 1;
  }
  return cursor;
}

// server/routes.ts
import { eq as eq2, inArray as inArray2 } from "drizzle-orm";
import multer from "multer";
import * as XLSX from "xlsx";

// server/backup-security.ts
import crypto2 from "crypto";
var BACKUP_ENVELOPE_KIND = "crm.backup.envelope";
var BACKUP_ENVELOPE_VERSION = 1;
var BACKUP_ENVELOPE_ALGORITHM = "aes-256-gcm";
function getBackupEncryptionSecret() {
  const value = String(process.env.BACKUP_ENCRYPTION_KEY || "").trim();
  return value || null;
}
function isEncryptedBackupEnvelope(value) {
  if (!value || typeof value !== "object") return false;
  const envelope = value;
  return envelope.kind === BACKUP_ENVELOPE_KIND && envelope.version === BACKUP_ENVELOPE_VERSION && envelope.algorithm === BACKUP_ENVELOPE_ALGORITHM && typeof envelope.salt === "string" && typeof envelope.iv === "string" && typeof envelope.tag === "string" && typeof envelope.ciphertext === "string";
}
function requireBufferFromBase642(value, label) {
  try {
    return Buffer.from(value, "base64");
  } catch {
    throw new Error(`Invalid encrypted backup ${label}.`);
  }
}
function deriveEncryptionKey2(secret, salt) {
  return crypto2.scryptSync(secret, salt, 32);
}
function isBackupEncryptionConfigured() {
  return Boolean(getBackupEncryptionSecret());
}
function assertBackupEncryptionReadyForProduction() {
  if (process.env.NODE_ENV === "production" && !isBackupEncryptionConfigured()) {
    throw new Error("BACKUP_ENCRYPTION_KEY must be set in production for backup operations.");
  }
}
function serializeBackupData(plaintext) {
  const secret = getBackupEncryptionSecret();
  if (!secret) {
    return { stored: plaintext, encrypted: false };
  }
  const salt = crypto2.randomBytes(16);
  const iv = crypto2.randomBytes(12);
  const key = deriveEncryptionKey2(secret, salt);
  const cipher = crypto2.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const envelope = {
    kind: BACKUP_ENVELOPE_KIND,
    version: BACKUP_ENVELOPE_VERSION,
    algorithm: BACKUP_ENVELOPE_ALGORITHM,
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64")
  };
  return {
    stored: JSON.stringify(envelope),
    encrypted: true
  };
}
function deserializeBackupData(stored) {
  const raw = String(stored || "");
  if (!raw) {
    return { plaintext: raw, encrypted: false };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { plaintext: raw, encrypted: false };
  }
  if (!isEncryptedBackupEnvelope(parsed)) {
    return { plaintext: raw, encrypted: false };
  }
  const secret = getBackupEncryptionSecret();
  if (!secret) {
    throw new Error("BACKUP_ENCRYPTION_KEY is required to decrypt this backup.");
  }
  const salt = requireBufferFromBase642(parsed.salt, "salt");
  const iv = requireBufferFromBase642(parsed.iv, "iv");
  const tag = requireBufferFromBase642(parsed.tag, "tag");
  const ciphertext = requireBufferFromBase642(parsed.ciphertext, "ciphertext");
  const key = deriveEncryptionKey2(secret, salt);
  const decipher = crypto2.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  return {
    plaintext,
    encrypted: true
  };
}

// server/routes.ts
var INTENDED_PERMISSION_ADMIN_ROLES = ["\uB300\uD45C\uC774\uC0AC", "\uCD1D\uAD04\uC774\uC0AC", "\uAC1C\uBC1C\uC790"];
var EXECUTIVE_DEPARTMENTS = /* @__PURE__ */ new Set(["\uACBD\uC601\uC9C4"]);
var USER_PERMISSION_FIELDS = /* @__PURE__ */ new Set(["role"]);
var USER_SELF_EDIT_FIELDS = /* @__PURE__ */ new Set(["password", "email", "phone"]);
var PERMISSION_ADMIN_ROLES = ["\uB300\uD45C", "\uC774\uC0AC", "\uB300\uD45C\uC774\uC0AC", "\uCD1D\uAD04\uC774\uC0AC", "\uAC1C\uBC1C\uC790"];
var MANAGER_POSITIONS = /* @__PURE__ */ new Set(["\uB9E4\uB2C8\uC800"]);
var COUNSELOR_POSITIONS = /* @__PURE__ */ new Set(["\uC0C1\uB2F4\uC6D0"]);
var ADMIN_ONLY_PAGE_KEYS = /* @__PURE__ */ new Set(["system_settings", "backup"]);
var DEPOSIT_ACTION_ALLOWED_DEPARTMENTS = /* @__PURE__ */ new Set(["\uACBD\uC601\uC9C0\uC6D0\uD300", "\uAC1C\uBC1C\uD300", "\uC5F0\uAD6C\uAC1C\uBC1C\uD300"]);
var REGIONAL_CUSTOMER_LIST_ALLOWED_DEPARTMENTS = /* @__PURE__ */ new Set(["\uD0C0\uC9C0\uC5ED\uD300"]);
var LOCAL_ADMIN_USER_ID = "__local_admin__";
var localAdminUser = {
  id: LOCAL_ADMIN_USER_ID,
  loginId: "admin",
  name: "\uAD00\uB9AC\uC790",
  email: null,
  phone: null,
  role: "\uAC1C\uBC1C\uC790",
  department: "\uAC1C\uBC1C\uD300",
  workStatus: "\uC7AC\uC9C1\uC911",
  isActive: true,
  lastLoginAt: null,
  lastPasswordChangeAt: null,
  createdAt: /* @__PURE__ */ new Date(0)
};
function serializeKoreanDbTimestamp(value) {
  if (!value) return value;
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return value;
    const pad = (part) => String(part).padStart(2, "0");
    return [
      value.getUTCFullYear(),
      pad(value.getUTCMonth() + 1),
      pad(value.getUTCDate())
    ].join("-") + `T${pad(value.getUTCHours())}:${pad(value.getUTCMinutes())}:${pad(value.getUTCSeconds())}+09:00`;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return value;
    if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,6})?)?Z$/i.test(trimmed)) {
      return trimmed.replace(" ", "T").replace(/Z$/i, "+09:00");
    }
    if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,6})?)?$/.test(trimmed)) {
      return `${trimmed.replace(" ", "T")}+09:00`;
    }
  }
  return value;
}
function serializeCustomerTimeFields(row) {
  return {
    ...row,
    createdAt: serializeKoreanDbTimestamp(row.createdAt),
    updatedAt: serializeKoreanDbTimestamp(row.updatedAt),
    lastCounselingCreatedAt: serializeKoreanDbTimestamp(row.lastCounselingCreatedAt),
    companyConvertedAt: serializeKoreanDbTimestamp(row.companyConvertedAt)
  };
}
function isLocalAdminLogin(loginId, password) {
  return !hasDatabaseConfig && String(loginId || "") === "admin" && String(password || "") === "a1234";
}
function getLocalAdminUserBySession(userId) {
  return !hasDatabaseConfig && userId === LOCAL_ADMIN_USER_ID ? localAdminUser : null;
}
async function ensureDeletedContractDepositsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS deleted_contract_deposits (
      contract_id varchar PRIMARY KEY REFERENCES contracts(id) ON DELETE CASCADE,
      deleted_at timestamp NOT NULL DEFAULT now()
    )
  `);
}
async function markContractDepositDeleted(contractId) {
  const normalized = String(contractId || "").trim();
  if (!normalized) return;
  await ensureDeletedContractDepositsTable();
  await pool.query(
    `
      INSERT INTO deleted_contract_deposits (contract_id, deleted_at)
      VALUES ($1, now())
      ON CONFLICT (contract_id)
      DO UPDATE SET deleted_at = now()
    `,
    [normalized]
  );
}
async function unmarkContractDepositDeleted(contractId) {
  const normalized = String(contractId || "").trim();
  if (!normalized) return;
  await ensureDeletedContractDepositsTable();
  await pool.query(`DELETE FROM deleted_contract_deposits WHERE contract_id = $1`, [normalized]);
}
function addCalendarDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
function toDateOnlyAtNoon(value) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12, 0, 0, 0);
}
function getRenewalDueDateForContract(contractDateValue, dueOffsetDaysValue) {
  const contractDate = normalizeToKoreanContractDate(contractDateValue);
  if (!contractDate) return null;
  const baseDate = toDateOnlyAtNoon(contractDate);
  const dueOffsetDays = Math.max(0, Math.round(Number(dueOffsetDaysValue) || 0));
  return toDateOnlyAtNoon(addCalendarDays(baseDate, dueOffsetDays));
}
function normalizeOptionalContractDateField(value) {
  if (value === void 0) return void 0;
  if (value === null || value === "") return null;
  const normalizedDate = normalizeToKoreanContractDate(value);
  if (normalizedDate) return normalizedDate;
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
  }
  return void 0;
}
function getRenewalDurationDays(contract) {
  const itemDays = parseContractProductDetailsForWorkCost(contract.productDetailsJson).map((item) => Math.max(0, Math.round(Number(item.days) || 0)));
  const contractDays = Math.max(0, Math.round(Number(contract.days) || 0));
  return Math.max(0, contractDays, ...itemDays);
}
var RENEWAL_SLOT_CATEGORY_KEY = "\uC2AC\uB86F\uC0C1\uD488";
function normalizeRenewalProductLookupKey(value) {
  return normalizeText(value).replace(/\s+/g, "").toLowerCase();
}
function getRenewalProductByName(allProducts) {
  return new Map(
    allProducts.map((product) => [normalizeRenewalProductLookupKey(product.name), product]).filter(([name]) => !!name)
  );
}
function isSlotRenewalProduct(productName, productByName) {
  const product = productByName.get(normalizeRenewalProductLookupKey(productName));
  return normalizeRenewalProductLookupKey(product?.category) === normalizeRenewalProductLookupKey(RENEWAL_SLOT_CATEGORY_KEY);
}
function getRenewalDueOffsetDays(contract, allProducts) {
  const productByName = getRenewalProductByName(allProducts);
  const itemRows = parseContractProductDetailsForWorkCost(contract.productDetailsJson).map((item) => ({
    productName: item.productName,
    days: Math.max(0, Math.round(Number(item.days) || 0))
  }));
  const contractDays = Math.max(0, Math.round(Number(contract.days) || 0));
  const rows = itemRows.length > 0 ? itemRows : String(contract.products || "").split(",").map((productName) => ({ productName: normalizeText(productName), days: contractDays })).filter((item) => item.productName);
  if (rows.length === 0) return contractDays;
  return Math.max(
    0,
    ...rows.map((item) => item.days + (isSlotRenewalProduct(item.productName, productByName) ? 1 : 0))
  );
}
function resolveRenewalSchedulePayload(contract, allProducts) {
  if (contract.contractType === CONTRACT_TYPE_REFUND) return contract;
  const durationDays = getRenewalDurationDays(contract);
  const dueOffsetDays = getRenewalDueOffsetDays(contract, allProducts);
  const next = { ...contract };
  if (!Object.prototype.hasOwnProperty.call(next, "renewalDueDate")) {
    const dueDate = getRenewalDueDateForContract(next.contractDate, dueOffsetDays);
    if (dueDate) next.renewalDueDate = dueDate;
  }
  if (durationDays <= 1) {
    next.renewalAlertDisabled = true;
  }
  return next;
}
var cachedTimezone = "Asia/Seoul";
var timezoneCacheTime = 0;
async function getSystemTimezone() {
  const now = Date.now();
  if (now - timezoneCacheTime > 6e4) {
    try {
      const setting = await storage.getSystemSetting("system_timezone");
      if (setting) cachedTimezone = setting.settingValue || "Asia/Seoul";
      timezoneCacheTime = now;
    } catch {
    }
  }
  return cachedTimezone;
}
function formatServerDate(date, timezone) {
  return date.toLocaleDateString("ko-KR", { timeZone: timezone });
}
function hasHangulText(value) {
  return /[가-힣]/.test(value);
}
function normalizeCustomerFileName(value) {
  const raw = String(value ?? "").trim().replace(/[\\\/]+/g, "_");
  if (!raw) return "download";
  try {
    const repaired = Buffer.from(raw, "latin1").toString("utf8").trim().replace(/[\\\/]+/g, "_");
    if (repaired && hasHangulText(repaired) && !hasHangulText(raw)) {
      return repaired;
    }
  } catch {
  }
  return raw;
}
function toAsciiDownloadFileName(value) {
  const normalized = value.normalize("NFKD").replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_").trim();
  return normalized || "download";
}
async function ensureCustomerDetailTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_counselings (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_id varchar NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      counseling_date timestamp NOT NULL,
      content text NOT NULL,
      created_by text,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_change_histories (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_id varchar NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      change_type text NOT NULL DEFAULT 'update',
      changed_fields text,
      before_data text,
      after_data text,
      created_by text,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_files (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_id varchar NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      file_name text NOT NULL,
      original_file_name text,
      mime_type text,
      size_bytes integer NOT NULL DEFAULT 0,
      file_data text NOT NULL,
      uploaded_by text,
      note text,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
  await pool.query(`
    ALTER TABLE customer_files
    ADD COLUMN IF NOT EXISTS original_file_name text,
    ADD COLUMN IF NOT EXISTS note text
  `);
}
async function ensureDealCustomerDbColumns() {
  await pool.query(`
    ALTER TABLE deals
    ADD COLUMN IF NOT EXISTS inbound_date timestamp,
    ADD COLUMN IF NOT EXISTS contract_start_date timestamp,
    ADD COLUMN IF NOT EXISTS contract_end_date timestamp,
    ADD COLUMN IF NOT EXISTS churn_date timestamp,
    ADD COLUMN IF NOT EXISTS renewal_due_date timestamp,
    ADD COLUMN IF NOT EXISTS contract_status text,
    ADD COLUMN IF NOT EXISTS phone text,
    ADD COLUMN IF NOT EXISTS email text,
    ADD COLUMN IF NOT EXISTS billing_account_number text,
    ADD COLUMN IF NOT EXISTS company_name text,
    ADD COLUMN IF NOT EXISTS industry text,
    ADD COLUMN IF NOT EXISTS telecom_provider text,
    ADD COLUMN IF NOT EXISTS customer_disposition text,
    ADD COLUMN IF NOT EXISTS customer_type_detail text,
    ADD COLUMN IF NOT EXISTS first_progress_status text,
    ADD COLUMN IF NOT EXISTS second_progress_status text,
    ADD COLUMN IF NOT EXISTS additional_progress_status text,
    ADD COLUMN IF NOT EXISTS acquisition_channel text,
    ADD COLUMN IF NOT EXISTS cancellation_reason text,
    ADD COLUMN IF NOT EXISTS salesperson text,
    ADD COLUMN IF NOT EXISTS pre_churn_stage text,
    ADD COLUMN IF NOT EXISTS line_count integer DEFAULT 1,
    ADD COLUMN IF NOT EXISTS cancelled_line_count integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS product_id varchar
  `);
}
async function ensureRegionalUnpaidTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS regional_unpaid_uploads (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      columns_json text NOT NULL,
      rows_json text NOT NULL,
      imported_count integer NOT NULL DEFAULT 0,
      excluded_count integer NOT NULL DEFAULT 0,
      uploaded_by text,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
}
async function ensureRegionalManagementFeeTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS regional_management_fees (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      fee_date timestamp NOT NULL,
      amount integer NOT NULL DEFAULT 0,
      product_name text NOT NULL,
      created_by text,
      updated_by text,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now()
    )
  `);
}
async function ensureRegionalCustomerListTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS regional_customer_lists (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      tier text NOT NULL,
      customer_name text NOT NULL,
      registration_count integer NOT NULL DEFAULT 0,
      same_customer text,
      exposure_notice boolean NOT NULL DEFAULT false,
      blog_review boolean NOT NULL DEFAULT false,
      cs_timeline text,
      sort_order integer NOT NULL DEFAULT 0,
      created_by text,
      updated_by text,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now()
    )
  `);
}
async function ensureProductColumns() {
  await pool.query(`
    ALTER TABLE products
    ADD COLUMN IF NOT EXISTS notes text
  `);
}
async function ensureCustomerKeepColumns() {
  await pool.query(`
    ALTER TABLE customers
    ADD COLUMN IF NOT EXISTS keep_balance_adjustment integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS lifecycle_stage text NOT NULL DEFAULT 'customer',
    ADD COLUMN IF NOT EXISTS created_by_name text,
    ADD COLUMN IF NOT EXISTS created_by_user_id varchar
  `);
}
async function ensureCustomerLifecycleSeedData() {
  await pool.query(`
    UPDATE customers
    SET lifecycle_stage = 'customer'
    WHERE lifecycle_stage IS NULL
       OR lifecycle_stage = ''
       OR lifecycle_stage NOT IN ('lead', 'customer')
  `);
  await pool.query(`
    UPDATE customers
    SET customer_type = '\uACC4\uC57D\uC644\uB8CC'
    WHERE lifecycle_stage = 'customer'
      AND (customer_type IS NULL OR customer_type = '' OR customer_type = '\uACC4\uC57D')
  `);
  await pool.query(
    `
      INSERT INTO customers (
        name, status, customer_type, lifecycle_stage, manager_name, created_at
      )
      SELECT $1, 'active', '\uAC00\uB9DD', 'lead', $2, now()
      WHERE NOT EXISTS (
        SELECT 1
        FROM customers
        WHERE lifecycle_stage = 'lead'
          AND name = $1
          AND manager_name = $2
      )
    `,
    ["\uD14C\uC2A4\uD2B8", "\uAE40\uC0C1\uB9CC"]
  );
}
async function ensureDepartmentNameSpacing() {
  const legacyMarketingSalesDepartment = `\uB9C8\uCF00\uD305 ${"\uC601\uC5C5\uD300"}`;
  const legacyMarketingPlanningDepartment = `\uB9C8\uCF00\uD305 ${"\uAE30\uD68D\uD300"}`;
  await db.update(users).set({ department: "\uB9C8\uCF00\uD305\uC601\uC5C5\uD300" }).where(eq2(users.department, legacyMarketingSalesDepartment));
  await db.update(users).set({ department: "\uB9C8\uCF00\uD305\uAE30\uD68D\uD300" }).where(eq2(users.department, legacyMarketingPlanningDepartment));
}
async function ensureContractColumns() {
  await pool.query(`
    ALTER TABLE contracts
    ADD COLUMN IF NOT EXISTS product_details_json text,
    ADD COLUMN IF NOT EXISTS deposit_bank text,
    ADD COLUMN IF NOT EXISTS renewal_due_date timestamp,
    ADD COLUMN IF NOT EXISTS renewal_alert_disabled boolean NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS contract_type text,
    ADD COLUMN IF NOT EXISTS source_contract_id varchar,
    ADD COLUMN IF NOT EXISTS source_item_id text
  `);
  await backfillContractRenewalSchedule();
}
async function backfillContractRenewalSchedule() {
  const existing = await pool.query(
    `
      SELECT COUNT(*) AS missing_count
      FROM contracts
      WHERE renewal_due_date IS NULL
        AND COALESCE(contract_type, '') <> $1
        AND contract_date IS NOT NULL
    `,
    [CONTRACT_TYPE_REFUND]
  );
  const missingCount = Number(existing.rows[0]?.missing_count || 0);
  if (missingCount === 0) return { missingCount, updatedCount: 0 };
  const [productsResult, contractsResult] = await Promise.all([
    pool.query(`SELECT name, category FROM products`),
    pool.query(
      `
        SELECT id, contract_date, products, days, product_details_json, contract_type
        FROM contracts
        WHERE renewal_due_date IS NULL
          AND COALESCE(contract_type, '') <> $1
          AND contract_date IS NOT NULL
      `,
      [CONTRACT_TYPE_REFUND]
    )
  ]);
  let updatedCount = 0;
  for (const row of contractsResult.rows) {
    const contract = {
      contractDate: row.contract_date,
      products: row.products,
      days: row.days,
      productDetailsJson: row.product_details_json,
      contractType: row.contract_type
    };
    const dueOffsetDays = getRenewalDueOffsetDays(contract, productsResult.rows);
    const dueDate = getRenewalDueDateForContract(contract.contractDate, dueOffsetDays);
    if (!dueDate) continue;
    const durationDays = getRenewalDurationDays(contract);
    const updated = await pool.query(
      `
        UPDATE contracts
        SET renewal_due_date = $2,
            renewal_alert_disabled = CASE WHEN $3 THEN true ELSE COALESCE(renewal_alert_disabled, false) END
        WHERE id = $1
          AND renewal_due_date IS NULL
      `,
      [row.id, dueDate, durationDays <= 1]
    );
    updatedCount += updated.rowCount || 0;
  }
  return { missingCount, updatedCount };
}
async function ensureDepositRefundMatchesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS deposit_refund_matches (
      deposit_id varchar NOT NULL REFERENCES deposits(id) ON DELETE CASCADE,
      refund_id varchar NOT NULL REFERENCES refunds(id) ON DELETE CASCADE,
      created_at timestamp NOT NULL DEFAULT now(),
      PRIMARY KEY (deposit_id, refund_id)
    )
  `);
}
async function getDepositRefundMatchIds(depositId) {
  await ensureDepositRefundMatchesTable();
  const result = await pool.query(
    `SELECT refund_id FROM deposit_refund_matches WHERE deposit_id = $1 ORDER BY created_at ASC`,
    [depositId]
  );
  return result.rows.map((row) => String(row.refund_id || "").trim()).filter(Boolean);
}
async function replaceDepositRefundMatches(depositId, refundIds) {
  await ensureDepositRefundMatchesTable();
  await pool.query(`DELETE FROM deposit_refund_matches WHERE deposit_id = $1`, [depositId]);
  const normalizedRefundIds = Array.from(new Set(refundIds.map((id) => String(id || "").trim()).filter(Boolean)));
  for (const refundId of normalizedRefundIds) {
    await pool.query(
      `INSERT INTO deposit_refund_matches (deposit_id, refund_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [depositId, refundId]
    );
  }
}
async function hasDepositRefundMatch(refundId) {
  const normalizedRefundId = String(refundId || "").trim();
  if (!normalizedRefundId) return false;
  await ensureDepositRefundMatchesTable();
  const result = await pool.query(
    `
      SELECT EXISTS (
        SELECT 1
        FROM deposit_refund_matches
        WHERE refund_id = $1
      ) AS matched
    `,
    [normalizedRefundId]
  );
  return Boolean(result.rows[0]?.matched);
}
async function clearDepositRefundMatches(depositId) {
  await ensureDepositRefundMatchesTable();
  await pool.query(`DELETE FROM deposit_refund_matches WHERE deposit_id = $1`, [depositId]);
}
async function hasContractDepositMatch(contractId) {
  const normalizedContractId = String(contractId || "").trim();
  if (!normalizedContractId) return false;
  const result = await pool.query(
    `
      SELECT EXISTS (
        SELECT 1
        FROM deposits
        WHERE contract_id = $1
      ) AS matched
    `,
    [normalizedContractId]
  );
  return Boolean(result.rows[0]?.matched);
}
async function ensureFinancialHistoryColumns() {
  await pool.query(`
    ALTER TABLE refunds
    ADD COLUMN IF NOT EXISTS previous_payment_method text,
    ADD COLUMN IF NOT EXISTS item_id text,
    ADD COLUMN IF NOT EXISTS user_identifier text,
    ADD COLUMN IF NOT EXISTS product_name text,
    ADD COLUMN IF NOT EXISTS days integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS add_quantity integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS extend_quantity integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS target_amount integer DEFAULT 0
  `);
  await pool.query(`
    ALTER TABLE keeps
    ADD COLUMN IF NOT EXISTS previous_payment_method text,
    ADD COLUMN IF NOT EXISTS item_id text,
    ADD COLUMN IF NOT EXISTS user_identifier text,
    ADD COLUMN IF NOT EXISTS product_name text,
    ADD COLUMN IF NOT EXISTS days integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS add_quantity integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS extend_quantity integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS target_amount integer DEFAULT 0
  `);
}
function shouldRunRuntimeSchemaEnsure() {
  const raw = String(process.env.RUNTIME_SCHEMA_ENSURE || "").trim().toLowerCase();
  if (raw === "true" || raw === "1" || raw === "yes" || raw === "on") return true;
  if (raw === "false" || raw === "0" || raw === "no" || raw === "off") return false;
  return (process.env.NODE_ENV || "production") !== "production";
}
async function getCurrentUserName(req) {
  if (!req.session.userId) return null;
  const user = await storage.getUser(req.session.userId);
  return user?.name || null;
}
function getRequestIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "";
}
function getRawTablePiiColumns(tableName) {
  return RAW_TABLE_PII_COLUMNS[tableName] ?? [];
}
function decryptRawTableRow(tableName, row) {
  return decryptRecordFields(row, getRawTablePiiColumns(tableName));
}
function encryptRawTablePayload(tableName, payload) {
  return encryptRecordFields(payload, getRawTablePiiColumns(tableName));
}
var CUSTOMER_CHANGE_HISTORY_RESPONSE_PII_FIELDS = ["beforeData", "afterData"];
var CUSTOMER_FILE_RESPONSE_PII_FIELDS = ["fileName", "note"];
async function writeSystemLog(req, payload) {
  try {
    if (!req.session.userId) return;
    const user = await storage.getUser(req.session.userId);
    if (!user) return;
    await storage.createSystemLog({
      userId: user.id,
      loginId: user.loginId,
      userName: user.name,
      action: payload.action,
      actionType: payload.actionType,
      ipAddress: getRequestIp(req),
      userAgent: req.headers["user-agent"] || "",
      details: payload.details || null
    });
  } catch (error) {
    console.error("System log write error:", error);
  }
}
async function writeEntityAuditLog(req, entity, operation, label, details) {
  const entityLabel = {
    customer: "\uACE0\uAC1D",
    product: "\uC0C1\uD488",
    contract: "\uACC4\uC57D"
  }[entity];
  const operationLabel = operation === "update" ? "\uC218\uC815" : "\uC0AD\uC81C";
  await writeSystemLog(req, {
    actionType: `${entity}_${operation}`,
    action: `${entityLabel} ${operationLabel}: ${label || "-"}`,
    details: details || null
  });
}
async function getContractCountByCustomerId(customerId) {
  const result = await pool.query(
    `SELECT COUNT(*)::int AS count FROM contracts WHERE customer_id = $1`,
    [customerId]
  );
  return Number(result.rows[0]?.count || 0);
}
async function getContractCountByProductReference(productId, productName) {
  const result = await pool.query(
    `
      WITH product_names AS (
        SELECT $2::text AS name
        UNION
        SELECT product_name AS name
        FROM product_rate_histories
        WHERE product_id = $1
      )
      SELECT COUNT(*)::int AS count
      FROM contracts
      WHERE EXISTS (
        SELECT 1
        FROM product_names
        WHERE name IS NOT NULL
          AND BTRIM(name) <> ''
          AND POSITION(
            LOWER(BTRIM(name)) IN LOWER(COALESCE(products, '') || ' ' || COALESCE(product_details_json, ''))
          ) > 0
      )
    `,
    [productId, productName]
  );
  return Number(result.rows[0]?.count || 0);
}
function isCustomerLifecycleStage(value, stage) {
  return String(value || "").trim() === stage;
}
function filterAssignablePageKeys(pageKeys) {
  return Array.from(new Set(pageKeys.filter((pageKey) => !ADMIN_ONLY_PAGE_KEYS.has(pageKey))));
}
function normalizeLeadCustomerPayload(body) {
  if (body.lifecycleStage !== "lead") return body;
  if (!String(body.customerType || "").trim()) {
    body.customerType = "\uAC00\uB9DD";
  }
  const category = String(body.customerCategory || "").trim();
  if (!category || category === "\uB9AC\uB4DC") {
    body.customerCategory = "\uC77C\uBC18\uACE0\uAC1D";
  }
  if (String(body.serviceType || "").trim() === "\uBCF5\uD569\uC0C1\uD488") {
    body.serviceType = null;
  }
  return body;
}
function normalizeDuplicateName(value) {
  return String(value ?? "").trim().replace(/\s+/g, "").toLowerCase();
}
function normalizeDuplicatePhone(value) {
  return String(value ?? "").replace(/\D/g, "");
}
var EMPTY_PHONE_PLACEHOLDER = "01000000000";
function isEmptyPhonePlaceholder(value) {
  return normalizeDuplicatePhone(value) === EMPTY_PHONE_PLACEHOLDER;
}
async function findLeadCustomerDuplicate(payload, excludeCustomerId) {
  const nameKey = normalizeDuplicateName(payload.name);
  const phoneKey = normalizeDuplicatePhone(payload.phone);
  if (!nameKey && !phoneKey) return null;
  const existingCustomers = await storage.getCustomers();
  return existingCustomers.find((customer) => {
    if (excludeCustomerId && String(customer.id) === String(excludeCustomerId)) return false;
    const existingNameKey = normalizeDuplicateName(customer.name);
    const existingPhoneKey = normalizeDuplicatePhone(customer.phone);
    const hasSamePhone = !!phoneKey && !isEmptyPhonePlaceholder(phoneKey) && !!existingPhoneKey && !isEmptyPhonePlaceholder(existingPhoneKey) && existingPhoneKey === phoneKey;
    const hasSameName = !!nameKey && !!existingNameKey && existingNameKey === nameKey;
    return hasSamePhone || !phoneKey && hasSameName || hasSameName && !!existingPhoneKey && existingPhoneKey === phoneKey;
  }) || null;
}
function duplicateLeadCustomerMessage(duplicate) {
  const type = isCustomerLifecycleStage(duplicate.lifecycleStage, "lead") ? "\uB9AC\uB4DC" : "\uACE0\uAC1D\uC0AC";
  const phone = String(duplicate.phone || "").trim() || "\uC804\uD654\uBC88\uD638 \uC5C6\uC74C";
  return `\uC774\uBBF8 \uB4F1\uB85D\uB41C ${type}\uC785\uB2C8\uB2E4. (${duplicate.name || "\uC774\uB984 \uC5C6\uC74C"} / ${phone})`;
}
async function getSessionUser(req) {
  return req.session.userId ? await storage.getUser(req.session.userId) : null;
}
function normalizeRoleName(role) {
  return String(role || "").trim();
}
function isManagerPosition(role) {
  return MANAGER_POSITIONS.has(normalizeRoleName(role));
}
function isCounselorPosition(role) {
  return COUNSELOR_POSITIONS.has(normalizeRoleName(role));
}
function canViewSensitiveFinancialFields(role) {
  return !isManagerPosition(role) && !isCounselorPosition(role);
}
function isOwnManagedRecord(currentUser, record) {
  const userId = normalizeText(currentUser.id);
  const userName = normalizeText(currentUser.name);
  return !!userId && normalizeText(record.managerId) === userId || !!userName && normalizeText(record.managerName) === userName;
}
function sanitizeFinancialContractRow(row, role) {
  if (canViewSensitiveFinancialFields(role)) return row;
  const sanitized = { ...row };
  sanitized.workCost = null;
  if (typeof sanitized.productDetailsJson === "string" && sanitized.productDetailsJson.trim()) {
    try {
      const details = JSON.parse(sanitized.productDetailsJson);
      if (Array.isArray(details)) {
        sanitized.productDetailsJson = JSON.stringify(details.map((item) => ({
          ...item,
          workCost: null,
          marginAmount: null
        })));
      }
    } catch {
      sanitized.productDetailsJson = null;
    }
  }
  return sanitized;
}
async function convertCustomerToCompany(customerId, convertedByName) {
  const updatePayload = {
    lifecycleStage: "customer",
    customerType: "\uACC4\uC57D\uC644\uB8CC"
  };
  const normalizedConvertedByName = normalizeText(convertedByName);
  if (normalizedConvertedByName) {
    updatePayload.managerName = normalizedConvertedByName;
  }
  return storage.updateCustomer(customerId, {
    ...updatePayload
  });
}
var BACKUP_MAX_BYTES = 200 * 1024 * 1024;
var BACKUP_ADVISORY_LOCK_KEY = 9020601;
var BACKUP_RETENTION_SETTING_KEY = "backup_retention_count";
var BACKUP_RETENTION_DEFAULT = 100;
var BACKUP_RETENTION_MIN = 10;
var BACKUP_RETENTION_MAX = 500;
var BACKUP_REQUIRED_TABLE_KEYS = [
  "users",
  "customers",
  "contacts",
  "deals",
  "dealTimelines",
  "regionalCustomerLists",
  "activities",
  "payments",
  "products",
  "contracts",
  "refunds",
  "keeps",
  "deposits",
  "notices",
  "pagePermissions",
  "systemSettings",
  "systemLogs"
];
var updateRegionalManagementFeeSchema = insertRegionalManagementFeeSchema.partial();
var updateRegionalCustomerListSchema = insertRegionalCustomerListSchema.partial();
var cachedBackupRetentionCount = BACKUP_RETENTION_DEFAULT;
var backupRetentionCacheTime = 0;
function clampBackupRetentionCount(value) {
  if (!Number.isFinite(value)) return BACKUP_RETENTION_DEFAULT;
  if (value < BACKUP_RETENTION_MIN) return BACKUP_RETENTION_MIN;
  if (value > BACKUP_RETENTION_MAX) return BACKUP_RETENTION_MAX;
  return Math.floor(value);
}
async function getBackupRetentionCount() {
  const now = Date.now();
  if (now - backupRetentionCacheTime > 6e4) {
    try {
      const setting = await storage.getSystemSetting(BACKUP_RETENTION_SETTING_KEY);
      const parsed = parseInt(setting?.settingValue || "", 10);
      cachedBackupRetentionCount = clampBackupRetentionCount(parsed);
    } catch {
      cachedBackupRetentionCount = BACKUP_RETENTION_DEFAULT;
    } finally {
      backupRetentionCacheTime = now;
    }
  }
  return cachedBackupRetentionCount;
}
async function pruneOldBackups(retentionCount) {
  const normalizedRetentionCount = clampBackupRetentionCount(retentionCount);
  const backups = await storage.getBackups();
  if (backups.length <= normalizedRetentionCount) return 0;
  const targets = backups.slice(normalizedRetentionCount);
  for (const backup of targets) {
    await storage.deleteBackup(backup.id);
  }
  return targets.length;
}
function validateBackupTablesShape(tables) {
  if (!tables || typeof tables !== "object") {
    return {
      isValid: false,
      missing: [...BACKUP_REQUIRED_TABLE_KEYS],
      invalid: []
    };
  }
  const source = tables;
  const missing = BACKUP_REQUIRED_TABLE_KEYS.filter((key) => !(key in source));
  const invalid = BACKUP_REQUIRED_TABLE_KEYS.filter((key) => key in source && !Array.isArray(source[key]));
  return {
    isValid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid
  };
}
async function tryAcquireBackupOperationLock() {
  const client = await pool.connect();
  try {
    const lockResult = await client.query(
      "SELECT pg_try_advisory_lock($1) AS acquired",
      [BACKUP_ADVISORY_LOCK_KEY]
    );
    const acquired = lockResult.rows[0]?.acquired === true;
    if (!acquired) {
      client.release();
      return null;
    }
    let released = false;
    return async () => {
      if (released) return;
      released = true;
      try {
        await client.query("SELECT pg_advisory_unlock($1)", [BACKUP_ADVISORY_LOCK_KEY]);
      } finally {
        client.release();
      }
    };
  } catch (error) {
    client.release();
    throw error;
  }
}
function computeBackupHashFromTables(tables) {
  const tableJson = JSON.stringify(tables);
  return crypto3.createHash("sha256").update(tableJson).digest("hex");
}
function buildBackupPayload(tables) {
  const hash = computeBackupHashFromTables(tables);
  return {
    version: "1.1",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    integrity: {
      algorithm: "sha256",
      contentHash: hash
    },
    tables
  };
}
function verifyBackupPayloadIntegrity(backupPayload) {
  if (!backupPayload || typeof backupPayload !== "object") {
    return { isValid: false, hash: "", reason: "invalid_payload" };
  }
  if (!backupPayload.tables || typeof backupPayload.tables !== "object") {
    return { isValid: false, hash: "", reason: "missing_tables" };
  }
  const computedHash = computeBackupHashFromTables(backupPayload.tables);
  const declaredHash = String(backupPayload?.integrity?.contentHash || "").trim();
  if (!declaredHash) {
    return { isValid: true, hash: computedHash, reason: "missing_integrity_legacy" };
  }
  if (declaredHash !== computedHash) {
    return { isValid: false, hash: computedHash, reason: "hash_mismatch" };
  }
  return { isValid: true, hash: computedHash, reason: "verified" };
}
var DEAL_NOTE_PREFIX = "[CS\uBA54\uBAA8]";
var DEAL_CANCELLATION_REASON_PREFIX = "[\uD574\uC9C0\uC0AC\uC720]";
function extractDealNoteFromTimelineContent(content) {
  const normalized = content.trim();
  if (!normalized) return null;
  if (normalized.startsWith(DEAL_NOTE_PREFIX)) {
    const stripped = normalized.slice(DEAL_NOTE_PREFIX.length).trim();
    return stripped || null;
  }
  if (normalized.startsWith("[\uC778\uC785]") || normalized.startsWith("[\uAC1C\uD1B5]") || normalized.startsWith("[\uD574\uC9C0]") || normalized.startsWith("[\uBD80\uBD84\uD574\uC9C0]") || normalized.startsWith(DEAL_CANCELLATION_REASON_PREFIX) || /^\[\?+\]/.test(normalized)) {
    return null;
  }
  return normalized;
}
function extractDealCancellationReasonFromTimelineContent(content) {
  const normalized = content.trim();
  if (!normalized) return null;
  const match = normalized.match(/^\[(?:해지사유|\?+)\]\s*(?:(?:\d{4}\.\d{2}\.\d{2})\s+)?([\s\S]+)$/);
  return match?.[1]?.trim() || null;
}
async function syncDealNotesFromLatestTimeline(dealId) {
  const timelines = await storage.getDealTimelines(dealId);
  const latestNoteContent = timelines.map((timeline) => extractDealNoteFromTimelineContent(String(timeline.content || ""))).find((content) => Boolean(content)) || "";
  await storage.updateDeal(dealId, { notes: latestNoteContent });
}
async function createDealTimelineAndSync(data) {
  const timeline = await storage.createDealTimeline({
    dealId: data.dealId,
    content: data.content,
    authorId: data.authorId ?? null,
    authorName: data.authorName ?? null
  });
  await syncDealNotesFromLatestTimeline(data.dealId);
  return timeline;
}
async function ensureDealNoteTimeline(data) {
  const normalizedNote = data.note.trim();
  if (!normalizedNote) return null;
  const timelines = await storage.getDealTimelines(data.dealId);
  const existing = timelines.find((timeline) => {
    const extracted = extractDealNoteFromTimelineContent(String(timeline.content || ""));
    return extracted === normalizedNote;
  });
  if (existing) {
    return existing;
  }
  return createDealTimelineAndSync({
    dealId: data.dealId,
    content: `${DEAL_NOTE_PREFIX} ${normalizedNote}`,
    authorId: data.authorId ?? null,
    authorName: data.authorName ?? null
  });
}
async function ensureDealCancellationReasonTimeline(data) {
  const normalizedReason = data.reason.trim();
  if (!normalizedReason) return null;
  const timelines = await storage.getDealTimelines(data.dealId);
  const existing = timelines.find((timeline) => {
    const extracted = extractDealCancellationReasonFromTimelineContent(String(timeline.content || ""));
    return extracted === normalizedReason;
  });
  if (existing) {
    return existing;
  }
  const tz = await getSystemTimezone();
  const reasonDate = data.reasonDate ? formatServerDate(new Date(data.reasonDate), tz) : formatServerDate(/* @__PURE__ */ new Date(), tz);
  return createDealTimelineAndSync({
    dealId: data.dealId,
    content: `${DEAL_CANCELLATION_REASON_PREFIX} ${reasonDate} ${normalizedReason}`,
    authorId: data.authorId ?? null,
    authorName: data.authorName ?? null
  });
}
async function autoLoginDev(req, _res, next) {
  if (process.env.NODE_ENV !== "production" && !req.session.userId) {
    if (req.cookies?.["crm_logged_out"] === "1") {
      return next();
    }
    const preferredLoginId = String(process.env.DEV_AUTO_LOGIN_ID || "").trim();
    const usersForAutoLogin = await storage.getUsers();
    const preferredUser = preferredLoginId ? usersForAutoLogin.find((user) => user.loginId === preferredLoginId && user.isActive) : void 0;
    const fallbackUser = preferredUser || usersForAutoLogin.find((user) => user.isActive && PERMISSION_ADMIN_ROLES.includes(user.role || "")) || usersForAutoLogin.find((user) => user.isActive);
    if (fallbackUser) {
      req.session.userId = fallbackUser.id;
    }
  }
  next();
}
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
  }
  next();
}
function toSingleString(value) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}
function toPositiveInt(value, fallback) {
  const parsed = parseInt(toSingleString(value), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}
function parseKoreanRangeStart(value) {
  const normalized = toSingleString(value).trim();
  if (!normalized) return void 0;
  const key = getKoreanDateKey(normalized);
  if (!key) return void 0;
  const date = /* @__PURE__ */ new Date(`${key}T00:00:00+09:00`);
  return Number.isNaN(date.getTime()) ? void 0 : date;
}
function parseKoreanRangeEnd(value) {
  const normalized = toSingleString(value).trim();
  if (!normalized) return void 0;
  const key = getKoreanDateKey(normalized);
  if (!key) return void 0;
  const date = /* @__PURE__ */ new Date(`${key}T23:59:59.999+09:00`);
  return Number.isNaN(date.getTime()) ? void 0 : date;
}
function normalizeFlagText(value) {
  return (value ?? "").toString().trim().toLowerCase();
}
function parseInvoiceIssuedFlag(value) {
  const normalized = normalizeFlagText(value);
  if (!normalized) return null;
  if (["true", "1", "y", "yes", "o", "\uBC1C\uD589", "\uBC1C\uAE09", "\uD3EC\uD568", "\uBD80\uAC00\uC138\uD3EC\uD568"].includes(normalized)) return true;
  if (["false", "0", "n", "no", "x", "\uBBF8\uBC1C\uD589", "\uBBF8\uBC1C\uAE09", "\uBBF8\uD3EC\uD568", "\uBCC4\uB3C4", "\uBD80\uAC00\uC138\uBCC4\uB3C4", "\uBA74\uC138"].includes(normalized)) return false;
  return null;
}
function normalizeDepositMatchVatType(value) {
  const normalized = String(value || "").replace(/\s+/g, "");
  if (["\uBD80\uAC00\uC138\uD3EC\uD568", "\uD3EC\uD568"].includes(normalized)) return "\uD3EC\uD568";
  return "\uBBF8\uD3EC\uD568";
}
function getDepositMatchItemQuantity(item) {
  const quantity = Math.max(0, Number(item.quantity) || 0);
  if (quantity > 0) return quantity;
  const addQuantity = Math.max(0, Number(item.addQuantity) || 0);
  const extendQuantity = Math.max(0, Number(item.extendQuantity) || 0);
  return Math.max(1, addQuantity + extendQuantity || 1);
}
function normalizeDepositMatchText(value) {
  return String(value ?? "").trim();
}
function normalizeDepositMatchCompactText(value) {
  return normalizeDepositMatchText(value).replace(/\s+/g, "");
}
function parseDepositMatchProductItems(rawValue) {
  const rawJson = String(rawValue || "").trim();
  if (!rawJson) return [];
  try {
    const parsed = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => !!item && typeof item === "object");
  } catch {
    return [];
  }
}
function getDepositMatchItemBaseAmount(item) {
  const storedSupplyAmount = Math.max(0, Number(item.supplyAmount) || 0);
  if (storedSupplyAmount > 0) return storedSupplyAmount;
  return Math.max(0, Number(item.unitPrice) || 0) * getDepositMatchItemQuantity(item);
}
function getDepositMatchItemGrossAmount(item, fallbackIncluded = false) {
  const storedGrossAmount = Math.max(0, Number(item.grossSupplyAmount) || 0);
  if (storedGrossAmount > 0) return storedGrossAmount;
  const baseAmount = getDepositMatchItemBaseAmount(item);
  const vatType = normalizeDepositMatchVatType(item.vatType ?? (fallbackIncluded ? "\uD3EC\uD568" : "\uBBF8\uD3EC\uD568"));
  return vatType === "\uD3EC\uD568" ? baseAmount + Math.round(baseAmount * 0.1) : baseAmount;
}
function findDepositMatchItem(contract, entry) {
  const items = parseDepositMatchProductItems(contract.productDetailsJson);
  const normalizedItemId = normalizeDepositMatchText(entry.itemId);
  if (normalizedItemId) {
    const exactItem = items.find((item) => normalizeDepositMatchText(item.id) === normalizedItemId);
    if (exactItem) return exactItem;
  }
  const normalizedUserIdentifier = normalizeDepositMatchCompactText(entry.userIdentifier);
  const normalizedProductName = normalizeDepositMatchCompactText(entry.productName);
  if (!normalizedUserIdentifier && !normalizedProductName) return null;
  return items.find(
    (item) => (!normalizedUserIdentifier || normalizeDepositMatchCompactText(item.userIdentifier) === normalizedUserIdentifier) && (!normalizedProductName || normalizeDepositMatchCompactText(item.productName) === normalizedProductName)
  ) || null;
}
function getDepositMatchRefundAmountWithVat(contract, entry) {
  const amount = Math.max(0, Number(entry.amount) || 0);
  if (amount <= 0) return 0;
  if (!contract) return amount;
  const matchedItem = findDepositMatchItem(contract, entry);
  if (matchedItem) {
    const itemBaseAmount = getDepositMatchItemBaseAmount(matchedItem);
    const itemGrossAmount = getDepositMatchItemGrossAmount(
      matchedItem,
      parseInvoiceIssuedFlag(contract.invoiceIssued) === true
    );
    const effectiveTargetBase = Math.max(0, Number(entry.targetAmount) || 0) || itemBaseAmount;
    if (effectiveTargetBase > 0 && itemBaseAmount > 0) {
      const scaledGrossTarget = Math.max(
        effectiveTargetBase,
        Math.round(effectiveTargetBase / itemBaseAmount * itemGrossAmount)
      );
      return Math.max(0, Math.floor(amount / effectiveTargetBase * scaledGrossTarget + 1e-6));
    }
  }
  const contractBaseAmount = Math.max(0, Number(entry.targetAmount) || 0) || Math.max(0, Number(contract.cost) || 0);
  const contractGrossAmount = Math.max(getDepositMatchContractAmount(contract), contractBaseAmount);
  if (contractBaseAmount > 0) {
    return Math.max(0, Math.floor(amount / contractBaseAmount * contractGrossAmount + 1e-6));
  }
  return amount;
}
function getDepositMatchContractAmount(contract) {
  const items = parseDepositMatchProductItems(contract.productDetailsJson).filter(
    (item) => String(item.productName || "").trim()
  );
  if (items.length > 0) {
    const fallbackIncluded = parseInvoiceIssuedFlag(contract.invoiceIssued) === true;
    return items.reduce((sum, item) => sum + getDepositMatchItemGrossAmount(item, fallbackIncluded), 0);
  }
  const baseAmount = Math.max(0, Number(contract.cost) || 0);
  if (parseInvoiceIssuedFlag(contract.invoiceIssued) === true) {
    return baseAmount + Math.round(baseAmount * 0.1);
  }
  return baseAmount;
}
function buildPaymentPayloadFromContract(contract) {
  return {
    contractId: contract.id,
    depositDate: contract.contractDate,
    customerName: contract.customerName,
    manager: contract.managerName,
    amount: contract.cost,
    depositConfirmed: contract.paymentConfirmed || false,
    paymentMethod: contract.paymentMethod || null,
    invoiceIssued: parseInvoiceIssuedFlag(contract.invoiceIssued) === true,
    notes: contract.notes || null
  };
}
function vatTypeFromInvoiceIssued(value) {
  const issued = parseInvoiceIssuedFlag(value);
  if (issued === null) return null;
  return issued ? "\uBD80\uAC00\uC138\uD3EC\uD568" : "\uBD80\uAC00\uC138\uBCC4\uB3C4";
}
var PAYMENT_METHOD_BEFORE_DEPOSIT = "\uC785\uAE08\uC608\uC815";
var PAYMENT_METHOD_REFUND_REQUEST = "\uD658\uBD88\uC694\uCCAD";
var PAYMENT_METHOD_DEPOSIT_CONFIRMED = "\uC785\uAE08\uC644\uB8CC";
var PAYMENT_METHOD_OTHER = "\uAE30\uD0C0";
var REFUND_STATUS_PENDING = "\uD658\uBD88\uB300\uAE30";
var REFUND_STATUS_REQUESTED = "\uD658\uBD88\uC694\uCCAD";
var REFUND_STATUS_COMPLETED = "\uD658\uBD88\uC644\uB8CC";
var REFUND_STATUS_OFFSET = "\uC0C1\uACC4\uCC98\uB9AC";
var CONTRACT_TYPE_REFUND = "refund";
var CONTRACT_DEPOSIT_BANK_DEFAULT = "\uAD6D\uBBFC\uC740\uD589";
var FINANCIAL_OVERRIDE_PAYMENT_METHODS = /* @__PURE__ */ new Set();
function normalizeContractPaymentMethod(value) {
  const raw = String(value ?? "").trim();
  const normalized = raw.replace(/\s+/g, "");
  const asciiKey = normalized.replace(/[_-]/g, "").toLowerCase();
  if (!normalized) return PAYMENT_METHOD_BEFORE_DEPOSIT;
  if (normalized === PAYMENT_METHOD_BEFORE_DEPOSIT || normalized === "\uC785\uAE08\uC804" || ["beforedeposit", "pendingdeposit", "beforepayment", "unpaid"].includes(asciiKey)) {
    return PAYMENT_METHOD_BEFORE_DEPOSIT;
  }
  if (normalized === PAYMENT_METHOD_REFUND_REQUEST || normalized === "\uD658\uBD88" || normalized === "\uD658\uBD88\uCC98\uB9AC" || normalized === "\uD658\uBD88\uB4F1\uB85D" || ["refund", "refunded", "refundrequest", "refundrequested"].includes(asciiKey)) {
    return PAYMENT_METHOD_REFUND_REQUEST;
  }
  if (normalized === "\uC801\uB9BD\uAE08\uC0AC\uC6A9" || normalized === "\uC801\uB9BD\uAE08" || normalized === "\uC801\uB9BD" || ["usekeep", "usecredit", "credituse", "keepuse", "keep", "credit"].includes(asciiKey)) return PAYMENT_METHOD_OTHER;
  if (normalized === PAYMENT_METHOD_DEPOSIT_CONFIRMED || normalized === "\uC785\uAE08\uD655\uC778" || normalized === "\uC785\uAE08\uC644\uB8CC" || normalized === "\uAD6D\uBBFC\uC740\uD589" || normalized === "\uCE74\uB4DC\uACB0\uC81C" || normalized === "\uD06C\uBABD" || ["deposit", "deposited", "banktransfer", "transfer", "confirmed", "kb", "kookmin", "kbstar", "card", "cardpayment", "kmong"].includes(asciiKey)) {
    return PAYMENT_METHOD_DEPOSIT_CONFIRMED;
  }
  if (normalized === PAYMENT_METHOD_OTHER || normalized === "\uCCB4\uD06C" || ["other", "check", "etc"].includes(asciiKey)) {
    return PAYMENT_METHOD_OTHER;
  }
  return raw;
}
function normalizeContractDepositBank(value, fallbackPaymentMethod) {
  const raw = String(value ?? "").trim();
  const paymentMethod = String(fallbackPaymentMethod ?? "").trim();
  const normalized = (raw || paymentMethod).replace(/\s+/g, "");
  const asciiKey = normalized.replace(/[_-]/g, "").toLowerCase();
  if (normalized === "\uAD6D\uBBFC" || normalized === "\uAD6D\uBBFC\uC740\uD589" || ["kb", "kookmin", "kbstar"].includes(asciiKey)) {
    return "\uAD6D\uBBFC\uC740\uD589";
  }
  if (normalized === "\uCE74\uB4DC\uACB0\uC81C" || normalized === "\uCE74\uB4DC \uACB0\uC81C" || ["card", "cardpayment", "creditcard"].includes(asciiKey)) {
    return "\uCE74\uB4DC\uACB0\uC81C";
  }
  if (normalized === "\uD06C\uBABD" || ["kmong"].includes(asciiKey)) {
    return "\uD06C\uBABD";
  }
  if (normalized === "\uAE30\uD0C0" || asciiKey === "other") {
    return "\uAE30\uD0C0";
  }
  return normalized ? "\uAE30\uD0C0" : CONTRACT_DEPOSIT_BANK_DEFAULT;
}
function shouldAutoMapDepositConfirmation(contract) {
  if (String(contract.contractType || "").trim() === CONTRACT_TYPE_REFUND) return false;
  if ((Number(contract.cost) || 0) <= 0) return false;
  return normalizeContractPaymentMethod(contract.paymentMethod) === PAYMENT_METHOD_DEPOSIT_CONFIRMED || contract.paymentConfirmed === true;
}
function buildAutoDepositPayloadFromContract(contract, confirmedBy) {
  const amount = Math.max(0, Math.round(getDepositMatchContractAmount(contract)));
  return {
    depositDate: contract.contractDate,
    depositorName: contract.customerName || "-",
    depositAmount: amount,
    depositBank: normalizeContractDepositBank(contract.depositBank, contract.paymentMethod),
    notes: contract.notes || null,
    confirmedAmount: amount,
    totalContractAmount: amount,
    contractId: contract.id,
    confirmedBy,
    confirmedAt: /* @__PURE__ */ new Date()
  };
}
async function upsertAutoDepositConfirmationFromContract(contract, confirmedBy = "system") {
  if (!shouldAutoMapDepositConfirmation(contract)) return null;
  const payload = buildAutoDepositPayloadFromContract(contract, confirmedBy);
  const existingDeposit = await storage.getDepositByContractId(contract.id);
  if (existingDeposit) {
    const updated = await storage.updateDeposit(existingDeposit.id, {
      ...payload,
      depositDate: existingDeposit.depositDate || payload.depositDate,
      depositBank: existingDeposit.depositBank || payload.depositBank,
      notes: existingDeposit.notes || payload.notes
    });
    await unmarkContractDepositDeleted(contract.id);
    return updated;
  }
  const created = await storage.createDeposit({
    ...payload,
    notes: payload.notes || "\uACC4\uC57D\uAD00\uB9AC \uC785\uAE08\uC644\uB8CC \uC790\uB3D9 \uB9E4\uD551"
  });
  await unmarkContractDepositDeleted(contract.id);
  return created;
}
function isMatchableDepositContract(contract) {
  const normalized = normalizeContractPaymentMethod(contract.paymentMethod);
  return normalized === PAYMENT_METHOD_BEFORE_DEPOSIT || normalized === PAYMENT_METHOD_OTHER;
}
function isFinancialOverridePaymentMethod(paymentMethod) {
  return FINANCIAL_OVERRIDE_PAYMENT_METHODS.has(normalizeContractPaymentMethod(paymentMethod));
}
function normalizeRestorablePaymentMethod(paymentMethod) {
  const normalized = normalizeContractPaymentMethod(paymentMethod);
  if (!normalized) return null;
  return isFinancialOverridePaymentMethod(normalized) ? null : normalized;
}
function resolveDepositFallbackPaymentMethod(contract) {
  const stored = normalizeRestorablePaymentMethod(contract?.paymentMethod);
  if (stored) return stored;
  if (contract?.paymentConfirmed) return PAYMENT_METHOD_DEPOSIT_CONFIRMED;
  return PAYMENT_METHOD_BEFORE_DEPOSIT;
}
function normalizeRefundStatus(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return null;
  if (normalized === REFUND_STATUS_COMPLETED || normalized === "\uD658\uBD88 \uC644\uB8CC" || normalized === "\uC644\uB8CC") {
    return REFUND_STATUS_COMPLETED;
  }
  if (normalized === REFUND_STATUS_PENDING || normalized === "\uD658\uBD88 \uC608\uC815" || normalized === "\uD658\uBD88\uC608\uC815" || normalized === "\uC608\uC815" || normalized === "\uB300\uAE30") {
    return REFUND_STATUS_PENDING;
  }
  if (normalized === REFUND_STATUS_REQUESTED || normalized === "\uD658\uBD88 \uC694\uCCAD") {
    return REFUND_STATUS_REQUESTED;
  }
  if (normalized === REFUND_STATUS_OFFSET || normalized === "\uC0C1\uACC4 \uCC98\uB9AC" || normalized === "\uC0C1\uACC4") {
    return REFUND_STATUS_OFFSET;
  }
  return normalized;
}
function isMissingPiiEncryptionKeyError(error) {
  return error instanceof Error && error.message.includes("PII_ENCRYPTION_KEY is required to decrypt this value");
}
function getMostRecentStoredPaymentMethod(refundList, keepList) {
  const candidates = [
    ...refundList.map((row) => ({
      previousPaymentMethod: row.previousPaymentMethod,
      createdAt: row.createdAt
    })),
    ...keepList.map((row) => ({
      previousPaymentMethod: row.previousPaymentMethod,
      createdAt: row.createdAt
    }))
  ].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
  for (const candidate of candidates) {
    const normalized = normalizeRestorablePaymentMethod(candidate.previousPaymentMethod);
    if (normalized) return normalized;
  }
  return null;
}
async function resolvePreviousFinancialBasePaymentMethod(contractId, contract) {
  const refundList = await storage.getRefundsByContract(contractId);
  return getMostRecentStoredPaymentMethod(refundList, []) ?? resolveDepositFallbackPaymentMethod(contract);
}
function parseEffectiveFrom(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return null;
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T00:00:00` : raw;
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return null;
}
function getKoreanDateKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  if (!year || !month || !day) return null;
  return `${year}-${month}-${day}`;
}
function getKoreanYearMonthKey(value) {
  const dateKey = getKoreanDateKey(value);
  if (!dateKey) return null;
  return dateKey.slice(0, 7);
}
function shiftKoreanYearMonthKey(yearMonth, monthDelta) {
  const baseDate = /* @__PURE__ */ new Date(`${yearMonth}-01T12:00:00+09:00`);
  if (Number.isNaN(baseDate.getTime())) return yearMonth;
  baseDate.setMonth(baseDate.getMonth() + monthDelta);
  const shifted = getKoreanYearMonthKey(baseDate);
  return shifted || yearMonth;
}
function normalizeToKoreanContractDate(value) {
  return normalizeToKoreanDateOnly(value);
}
function isWithinKoreanDateRange(value, start, end) {
  const targetKey = getKoreanDateKey(value);
  if (!targetKey) return false;
  const startKey = start ? getKoreanDateKey(start) : null;
  const endKey = end ? getKoreanDateKey(end) : null;
  if (startKey && endKey) {
    const rangeStart = startKey <= endKey ? startKey : endKey;
    const rangeEnd = startKey <= endKey ? endKey : startKey;
    return targetKey >= rangeStart && targetKey <= rangeEnd;
  }
  if (startKey) return targetKey >= startKey;
  if (endKey) return targetKey <= endKey;
  return true;
}
var MARKETING_DEPARTMENT = "\uB9C8\uCF00\uD305\uD300";
var REGIONAL_DEPARTMENT = "\uD0C0\uC9C0\uC5ED\uD300";
var REGIONAL_MONTHLY_OPEN_TARGET = 1e4;
var REGIONAL_MONTHLY_CHURN_DEFENSE_TARGET = 3e3;
var WORK_STATUS_EMPLOYED = "\uC7AC\uC9C1\uC911";
var WORK_STATUS_ON_LEAVE = "\uD734\uC9C1\uC911";
var WORK_STATUS_RESIGNED = "\uD1F4\uC0AC";
var REGIONAL_CHANGED_STATUS_SENTINEL = "__changed__";
function normalizeText(value) {
  return String(value ?? "").trim();
}
function normalizeCompactText2(value) {
  return normalizeText(value).replace(/\s+/g, "");
}
function getRegionalDealStageLabel(stage) {
  const normalized = normalizeText(stage);
  if (normalized === "churned") return "\uD574\uC9C0";
  if (normalized === "active") return "\uAC1C\uD1B5";
  return "\uC778\uC785";
}
function normalizeRegionalDealContractStatus(value, stageHint) {
  const normalized = normalizeText(value);
  if (!normalized || normalized === "(\uACF5\uBC31)") return "";
  if (normalized === REGIONAL_CHANGED_STATUS_SENTINEL) return "\uBCC0\uACBD";
  if (normalized === "\uBCC0\uACBD") return "\uBCC0\uACBD";
  if (normalized === "\uD574\uC9C0") return "\uD574\uC9C0";
  if (normalized === "\uAC1C\uD1B5" || normalized === "\uB4F1\uB85D" || normalized === "\uC720\uC9C0") return "\uAC1C\uD1B5";
  if (normalized === "\uC778\uC785" || normalized === "\uC2E0\uADDC" || normalized === "\uC2E0\uADDC\uC0C1\uB2F4" || normalized === "\uB4F1\uB85D/\uAC31\uC2E0\uC608\uC815") {
    return "\uC778\uC785";
  }
  if (stageHint === "churned") return "\uD574\uC9C0";
  if (stageHint === "active") return "\uAC1C\uD1B5";
  if (stageHint === "new") return "\uC778\uC785";
  return normalized;
}
function getRegionalDealStageFromStatus(value) {
  const normalized = normalizeRegionalDealContractStatus(value);
  if (!normalized) return null;
  if (normalized === "\uBCC0\uACBD") return null;
  if (normalized === "\uD574\uC9C0") return "churned";
  if (normalized === "\uAC1C\uD1B5") return "active";
  return "new";
}
function normalizeRegionalDealDate(value) {
  const normalized = normalizeToKoreanContractDate(value);
  if (!normalized) return null;
  if (normalized.getFullYear() < 2e3) return null;
  return normalized;
}
function addDaysToKoreanDate(value, dayDelta) {
  return normalizeRegionalDealDate(addKoreanBusinessDays(value, dayDelta));
}
function getRegionalDealOpenAnalyticsDate(deal) {
  return normalizeRegionalDealDate(deal.contractEndDate) ?? addDaysToKoreanDate(deal.contractStartDate, 1) ?? normalizeRegionalDealDate(deal.contractStartDate) ?? normalizeRegionalDealDate(deal.inboundDate) ?? normalizeRegionalDealDate(deal.createdAt);
}
function parseLooseTimelineDateKey(value) {
  const text2 = normalizeText(value);
  if (!text2) return null;
  const matched = text2.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!matched) return null;
  const [, year, month, day] = matched;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
function parseRegionalTimelineAddEventDetail(content) {
  const matched = String(content || "").match(/\[회선추가\].*?개통일\s+([^/]+?)\s*\/\s*(\d+)\s*회선\s*추가/i);
  if (!matched) return null;
  const dateKey = parseLooseTimelineDateKey(matched[1]);
  const count2 = Math.max(Number.parseInt(matched[2] || "0", 10) || 0, 0);
  if (!dateKey || count2 <= 0) return null;
  return {
    dateKey,
    yearMonth: dateKey.slice(0, 7),
    count: count2
  };
}
function buildRegionalMonthlyYearMonthRange(_start, _end) {
  const anchorDate = normalizeToKoreanContractDate(/* @__PURE__ */ new Date()) ?? /* @__PURE__ */ new Date();
  const currentMonthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
  const cursor = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - 4, 1);
  const stop = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth(), 1);
  const keys = [];
  while (cursor <= stop && keys.length < 5) {
    keys.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`);
    cursor.setMonth(cursor.getMonth() + 1);
  }
  if (keys.length === 0) {
    const fallbackKey = getKoreanYearMonthKey(anchorDate);
    return fallbackKey ? [fallbackKey] : [];
  }
  return keys;
}
function normalizeWorkStatus(value) {
  const normalized = normalizeText(value);
  if (!normalized || normalized === "\uADFC\uBB34" || normalized === "\uADFC\uBB34\uC911" || normalized === "\uC7AC\uC9C1" || normalized === WORK_STATUS_EMPLOYED) {
    return WORK_STATUS_EMPLOYED;
  }
  if (normalized === "\uD734\uC9C1" || normalized === WORK_STATUS_ON_LEAVE) {
    return WORK_STATUS_ON_LEAVE;
  }
  if (normalized === WORK_STATUS_RESIGNED) {
    return WORK_STATUS_RESIGNED;
  }
  return normalized;
}
function isWorkStatusBlockedForLogin(value) {
  const normalized = normalizeWorkStatus(value);
  return normalized === WORK_STATUS_ON_LEAVE || normalized === WORK_STATUS_RESIGNED;
}
function toAmount(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function toWholeAmount(value) {
  return Math.max(0, Math.floor(toAmount(value)));
}
function toSignedWholeAmount(value) {
  const parsed = toAmount(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : 0;
}
function getKeepDeductionAmount(contract) {
  return Math.max(0, toAmount(contract?.totalKeep));
}
function getEffectiveSalesAmount(contract) {
  return toAmount(contract?.cost) - getKeepDeductionAmount(contract);
}
function getGrossSalesAmount(contract) {
  return toAmount(contract?.cost) + Math.max(0, toAmount(contract?.totalRefund));
}
var SLOT_PRODUCT_ALIAS_KEYS = new Set(
  [
    "\uD3EC\uC720",
    "bbs\uCFE0\uD321",
    "\uC2A4\uD2F0\uC820",
    "\uD504\uB77C\uB2E4",
    "\uAC00\uB4DC",
    "\uBCA0\uB77C",
    "\uC18C\uBCF4\uB8E8\uD50C\uB7EC\uC2A4",
    "dex",
    "deep",
    "\uC790\uBABD",
    "\uB8E8\uB098",
    "\uC5D8\uB9AD\uC11C",
    "\uD53C\uCF54",
    "\uB9D0\uCC28\uD2B8\uB798\uD53D",
    "\uBE14\uB80C\uB529",
    "\uC77C\uB8E8\uB9C8",
    "\uC5D8\uB9AC\uD2B8",
    "\uC0BF\uD3EC\uB85C",
    "\uD50C\uB808\uC774\uC2A4\uD2B8\uB798\uD53D",
    "\uC5B8\uB354\uB354\uB51C\uD2B8\uB798\uD53D",
    "\uC2A4\uCE94\uB4E4",
    "\uB7AD\uD06C\uC5C5",
    "\uBE14\uB8E8",
    "\uB124\uC774\uBC84\uC790\uB3D9\uC644\uC131",
    "\uD1A0\uB9C8\uD1A0",
    "\uC6F9\uC0AC\uC774\uD2B8\uC0C1\uC704",
    "\uBC14\uC774\uB7F4m\uCD1D\uD310",
    "\uC544\uB2F4",
    "\uC790\uB3D9\uC644\uC131\uC2AC\uB86F",
    "\uD3EC\uC720\uD50C\uB808\uC774\uC2A4",
    "\uB77C\uCE78\uD2B8\uB798\uD53D",
    "\uC564\uB4DC\uB958\uD2B8\uB798\uD53D",
    "\uC6F9\uC0AC\uC774\uD2B8\uC6D4\uBCF4\uC7A5",
    "\uD50C\uB808\uC774\uC2A4\uC6D4\uBCF4\uC7A5",
    "top",
    "\uAC24\uB7ED\uC2DC",
    "\uD050\uB7AD",
    "1219",
    "\uC6F9\uC0AC\uC774\uD2B8\uC2AC\uB86F",
    "\uC6F9\uC0AC\uC774\uD2B8\uD2B8\uB798\uD53D",
    "\uC0BF\uD3EC\uB85C\uD2B8\uB798\uD53D",
    "\uBA54\uB9AC\uD2B8\uC790\uC644",
    "\uD0D1\uC778",
    "\uD5E4\uB974\uBA54\uC2A4",
    "\uBCF4\uC2A4",
    "\uBBA4\uC988",
    "\uB124\uC774\uBC84\uD568\uCC3E",
    "\uC0C1\uD488\uCC1C",
    "\uCEE4\uBBA4\uB2C8\uD2F0\uCE68\uD22C",
    "\uC778\uAE30\uAE00\uC6D4\uBCF4\uC7A5",
    "\uB9C8\uBA58\uD1A0\uC6D4\uAC04\uC778\uAE30\uAE00"
  ].map((value) => normalizeText(value).replace(/\s+/g, "").toLowerCase())
);
var VIRAL_PRODUCT_ALIAS_KEYS = new Set(
  [
    "\uC81C\uC791\uC601\uC218\uC99D\uB9AC\uBDF0",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0\uC2E4\uBC30\uC1A1",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0\uC790\uC0AC\uBAB0",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0\uCE74\uCE74\uC624",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0\uC625\uC158",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0g\uB9C8\uCF13",
    "\uAC00\uAD6C\uB9E4\uB9AC\uBDF0\uC571",
    "\uD398\uC774\uBC31\uB300\uD589",
    "ai\uBE14\uB85C\uADF8\uBC30\uD3EC",
    "\uAD6C\uAE00\uD50C\uB808\uC774\uC2A4\uB9AC\uBDF0",
    "\uCE74\uCE74\uC624\uB9F5\uB9AC\uBDF0",
    "\uC601\uC218\uC99D\uB9AC\uBDF0",
    "\uC900\uCD5C\uBE14\uBC30\uD3EC",
    "\uC608\uC57D\uC790\uB9AC\uBDF0",
    "\uC6D0\uACE0\uB300\uD589",
    "\uCD5C\uBE14\uBC30\uD3EC",
    "\uC5B8\uB860\uC1A1\uCD9C",
    "\uCE74\uD398\uBC30\uD3EC",
    "\uBE0C\uB79C\uB4DC\uBE14\uB85C\uADF8",
    "\uBE0C\uB79C\uB4DC\uBE14\uB85C\uADF8\uD504\uB9AC\uBBF8\uC5C4",
    "\uBC14\uBE44\uD1A1\uC0C1\uB2F4",
    "\uBE0C\uB79C\uB4DC\uC778\uC2A4\uD0C0",
    "\uAE30\uC790\uB2E8",
    "\uBE14\uB85C\uADF8\uB9AC\uBDF0",
    "\uC9C0\uC2DD\uC778\uCD94\uCC9C\uC88B\uC544\uC694",
    "\uC9C0\uC2DD\uC778\uAC74\uBC14\uC774",
    "\uCCB4\uD5D8\uB2E8",
    "\uBE14\uB85C\uADF8\uCCB4\uD5D8\uB2E8",
    "\uC778\uC2A4\uD0C0\uCCB4\uD5D8\uB2E8",
    "\uCD2C\uC601\uB2E8",
    "\uB9AC\uBDF0",
    "\uBAA8\uB450\uB2E5\uB9AC\uBDF0",
    "\uB2E4\uC54C\uB824\uB4DC\uB9BC\uC9C0\uC218\uD50C",
    "\uB9C8\uBA58\uD1A0\uC778\uAE30\uAE00",
    "\uC778\uD3EC\uADF8\uB798\uD53D",
    "\uB2F9\uADFC\uD6C4\uAE30"
  ].map((value) => normalizeText(value).replace(/\s+/g, "").toLowerCase())
);
function isRegionalKeyword(value) {
  const normalized = normalizeText(value).replace(/\s+/g, "");
  return normalized.includes("\uD0C0\uC9C0\uC5ED");
}
function buildProductHistoryMap(histories) {
  const map = /* @__PURE__ */ new Map();
  for (const history of histories) {
    const key = (history.productName || "").trim();
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(history);
  }
  Array.from(map.values()).forEach((historyList) => {
    historyList.sort((a, b) => {
      const effectiveDiff = new Date(b.effectiveFrom).getTime() - new Date(a.effectiveFrom).getTime();
      if (effectiveDiff !== 0) return effectiveDiff;
      const aCreatedAt = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bCreatedAt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bCreatedAt - aCreatedAt;
    });
  });
  return map;
}
function resolveProductSnapshotByDate(productName, contractDate, productMap, historyMap) {
  const normalizedName = (productName || "").trim();
  if (!normalizedName) return void 0;
  const historyList = historyMap.get(normalizedName) ?? [];
  if (historyList.length > 0) {
    const contractTime = contractDate ? new Date(contractDate).getTime() : Number.NaN;
    if (!Number.isNaN(contractTime)) {
      const matched = historyList.find((history) => new Date(history.effectiveFrom).getTime() <= contractTime);
      if (matched) return matched;
      return historyList[historyList.length - 1];
    }
    return historyList[0];
  }
  return productMap.get(normalizedName);
}
async function resolveFinancialPaymentMethod(contractId) {
  const [refundList, contract] = await Promise.all([
    storage.getRefundsByContract(contractId),
    storage.getContract(contractId)
  ]);
  return getMostRecentStoredPaymentMethod(refundList, []) ?? resolveDepositFallbackPaymentMethod(contract);
}
async function syncFinancialPaymentMethod(contractId, options) {
  const paymentMethod = await resolveFinancialPaymentMethod(contractId);
  const restoredPaymentMethod = isFinancialOverridePaymentMethod(paymentMethod) ? paymentMethod : normalizeRestorablePaymentMethod(options?.deletedPreviousPaymentMethod) ?? paymentMethod;
  await Promise.all([
    storage.updateContract(contractId, { paymentMethod: restoredPaymentMethod }),
    storage.updatePaymentByContractId(contractId, { paymentMethod: restoredPaymentMethod })
  ]);
  return restoredPaymentMethod;
}
function getContractQuantityForWorkCost(contract) {
  const quantity = Math.max(Number(contract.quantity) || 0, 0);
  if (quantity > 0) return quantity;
  const addQuantity = Math.max(Number(contract.addQuantity) || 0, 0);
  const extendQuantity = Math.max(Number(contract.extendQuantity) || 0, 0);
  return Math.max(addQuantity + extendQuantity, 1);
}
function parseContractProductDetailsForWorkCost(rawValue) {
  if (typeof rawValue !== "string" || !rawValue.trim()) return [];
  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => !!item && typeof item === "object").map((item) => ({
      id: typeof item.id === "string" ? item.id : null,
      productName: typeof item.productName === "string" ? item.productName : null,
      userIdentifier: typeof item.userIdentifier === "string" ? item.userIdentifier : null,
      vatType: typeof item.vatType === "string" ? item.vatType : null,
      unitPrice: Number(item.unitPrice) || 0,
      days: Number(item.days) || 0,
      addQuantity: Number(item.addQuantity) || 0,
      extendQuantity: Number(item.extendQuantity) || 0,
      quantity: Number(item.quantity) || 0,
      baseDays: Number(item.baseDays) || 0,
      worker: typeof item.worker === "string" ? item.worker : null,
      workCost: Number(item.workCost) || 0,
      fixedWorkCostAmount: item.fixedWorkCostAmount === null || item.fixedWorkCostAmount === void 0 ? null : Number(item.fixedWorkCostAmount) || 0,
      supplyAmount: item.supplyAmount === null || item.supplyAmount === void 0 ? null : toSignedWholeAmount(item.supplyAmount),
      grossSupplyAmount: item.grossSupplyAmount === null || item.grossSupplyAmount === void 0 ? null : toSignedWholeAmount(item.grossSupplyAmount),
      marginAmount: item.marginAmount === null || item.marginAmount === void 0 ? null : toSignedWholeAmount(item.marginAmount),
      adjustmentType: typeof item.adjustmentType === "string" ? item.adjustmentType : null
    })).filter((item) => String(item.productName || "").trim().length > 0);
  } catch {
    return [];
  }
}
function getUnifiedContractQuantity(quantityValue, addQuantityValue, extendQuantityValue, fallback = 0) {
  const quantity = Math.max(0, Math.round(Number(quantityValue) || 0));
  if (quantity > 0) return quantity;
  const splitQuantity = Math.max(0, Math.round(Number(addQuantityValue) || 0)) + Math.max(0, Math.round(Number(extendQuantityValue) || 0));
  return splitQuantity > 0 ? splitQuantity : Math.max(0, Math.round(Number(fallback) || 0));
}
function normalizeContractProductDetailsQuantity(rawValue) {
  if (typeof rawValue !== "string" || !rawValue.trim()) return rawValue;
  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return rawValue;
    return JSON.stringify(
      parsed.map((item) => {
        if (!item || typeof item !== "object") return item;
        return {
          ...item,
          addQuantity: 0,
          extendQuantity: 0,
          quantity: getUnifiedContractQuantity(
            item.quantity,
            item.addQuantity,
            item.extendQuantity
          )
        };
      })
    );
  } catch {
    return rawValue;
  }
}
function normalizeContractQuantityPayload(payload) {
  const next = { ...payload };
  const hasQuantityFields = Object.prototype.hasOwnProperty.call(next, "quantity") || Object.prototype.hasOwnProperty.call(next, "addQuantity") || Object.prototype.hasOwnProperty.call(next, "extendQuantity");
  if (hasQuantityFields) {
    next.quantity = getUnifiedContractQuantity(next.quantity, next.addQuantity, next.extendQuantity);
    next.addQuantity = 0;
    next.extendQuantity = 0;
  }
  if (Object.prototype.hasOwnProperty.call(next, "productDetailsJson")) {
    next.productDetailsJson = normalizeContractProductDetailsQuantity(next.productDetailsJson);
  }
  return next;
}
function findRefundSourceProductDetail(contract, itemId, userIdentifier, productName) {
  const items = parseContractProductDetailsForWorkCost(contract.productDetailsJson);
  const normalizedItemId = normalizeText(itemId);
  if (normalizedItemId) {
    const exact = items.find((item) => normalizeText(item.id) === normalizedItemId);
    if (exact) return exact;
  }
  const normalizedUserIdentifier = normalizeCompactText2(userIdentifier);
  const normalizedProductName = normalizeCompactText2(productName);
  if (!normalizedUserIdentifier && !normalizedProductName) return null;
  return items.find(
    (item) => (!normalizedUserIdentifier || normalizeCompactText2(item.userIdentifier) === normalizedUserIdentifier) && (!normalizedProductName || normalizeCompactText2(item.productName) === normalizedProductName)
  ) || null;
}
function getRefundQuantitySplit(sourceItem, refundQuantity) {
  return { addQuantity: 0, extendQuantity: 0 };
}
function getRefundContractNumber(sourceContract, refundDate) {
  const sourceNumber = normalizeText(sourceContract.contractNumber) || "CONTRACT";
  const dateKey = getKoreanDateKey(refundDate)?.replace(/-/g, "") || "refund";
  return `${sourceNumber}-RF-${dateKey}-${crypto3.randomUUID().slice(0, 8)}`;
}
function getRefundContractWorkCostAmount(sourceContract, sourceItem, refundAmount, effectiveTargetAmount, refundQuantity, refundDays) {
  const sourceUnitWorkCost = Math.max(0, Number(sourceItem?.workCost) || 0);
  const sourceBaseDays = Math.max(1, Number(sourceItem?.baseDays) || 0, 1);
  if (sourceUnitWorkCost > 0 && refundQuantity > 0 && refundDays > 0) {
    return Math.round(sourceUnitWorkCost / sourceBaseDays * refundQuantity * refundDays);
  }
  const sourceFixedWorkCost = Math.max(0, Number(sourceItem?.fixedWorkCostAmount) || 0);
  if (sourceFixedWorkCost > 0 && effectiveTargetAmount > 0) {
    return Math.round(sourceFixedWorkCost * (refundAmount / effectiveTargetAmount));
  }
  const sourceSupplyAmount = Math.max(0, Number(sourceItem?.supplyAmount) || 0);
  const sourceMarginAmount = Number(sourceItem?.marginAmount);
  if (sourceSupplyAmount > 0 && Number.isFinite(sourceMarginAmount)) {
    const sourceWorkCost = Math.max(0, sourceSupplyAmount - sourceMarginAmount);
    if (sourceWorkCost > 0) {
      return Math.round(sourceWorkCost * (refundAmount / sourceSupplyAmount));
    }
  }
  const contractWorkCost = Math.max(0, Number(sourceContract.workCost) || 0);
  if (contractWorkCost > 0 && effectiveTargetAmount > 0) {
    return Math.round(contractWorkCost * (refundAmount / effectiveTargetAmount));
  }
  return 0;
}
function buildRefundContractPayload(sourceContract, refundInput, effectiveTargetAmount) {
  const sourceItem = findRefundSourceProductDetail(
    sourceContract,
    refundInput.itemId || null,
    refundInput.userIdentifier || null,
    refundInput.productName || null
  );
  const refundQuantity = Math.max(0, Math.round(Number(refundInput.quantity) || 0));
  const refundDays = Math.max(0, Math.round(Number(refundInput.refundDays) || 0));
  const { addQuantity, extendQuantity } = getRefundQuantitySplit(sourceItem, refundQuantity);
  const refundAmount = Math.max(0, Math.round(Number(refundInput.amount) || 0));
  const refundWorkCost = getRefundContractWorkCostAmount(
    sourceContract,
    sourceItem,
    refundAmount,
    effectiveTargetAmount,
    refundQuantity,
    refundDays
  );
  const productName = normalizeText(refundInput.productName || sourceItem?.productName || sourceContract.products) || "\uD658\uBD88";
  const userIdentifier = normalizeText(refundInput.userIdentifier || sourceItem?.userIdentifier || sourceContract.userIdentifier);
  const vatType = normalizeText(sourceItem?.vatType) || vatTypeFromInvoiceIssued(sourceContract.invoiceIssued) || "\uBBF8\uD3EC\uD568";
  const unitPrice = Math.max(0, Number(sourceItem?.unitPrice) || 0) || (refundQuantity > 0 ? Math.round(effectiveTargetAmount / refundQuantity) : 0);
  const negativeRefundAmount = -refundAmount;
  const negativeRefundWorkCost = -refundWorkCost;
  const marginAmount = negativeRefundAmount - negativeRefundWorkCost;
  const sourceItemId = normalizeText(refundInput.itemId || sourceItem?.id);
  const productDetailsJson = JSON.stringify([
    {
      id: `refund-${sourceItemId || "item"}-${crypto3.randomUUID().slice(0, 8)}`,
      productName,
      userIdentifier,
      vatType,
      unitPrice,
      days: refundDays > 0 ? -refundDays : 0,
      addQuantity,
      extendQuantity,
      quantity: refundQuantity,
      baseDays: Math.max(1, Number(sourceItem?.baseDays) || Number(refundInput.days) || 1),
      worker: normalizeText(refundInput.worker || sourceItem?.worker || sourceContract.worker),
      workCost: Math.max(0, Number(sourceItem?.workCost) || 0),
      fixedWorkCostAmount: negativeRefundWorkCost,
      disbursementStatus: "",
      supplyAmount: negativeRefundAmount,
      grossSupplyAmount: parseInvoiceIssuedFlag(sourceContract.invoiceIssued) === true ? -(refundAmount + Math.round(refundAmount * 0.1)) : negativeRefundAmount,
      refundAmount: 0,
      negativeAdjustmentAmount: negativeRefundAmount,
      marginAmount,
      adjustmentType: CONTRACT_TYPE_REFUND,
      sourceContractId: sourceContract.id,
      sourceItemId: sourceItemId || null,
      refundReason: normalizeText(refundInput.reason)
    }
  ]);
  const noteParts = [
    `\uD658\uBD88 \uACC4\uC57D`,
    `\uC6D0\uACC4\uC57D\uBC88\uD638: ${sourceContract.contractNumber}`,
    `\uC6D0\uACC4\uC57DID: ${sourceContract.id}`,
    sourceItemId ? `\uC6D0\uD56D\uBAA9ID: ${sourceItemId}` : null,
    refundInput.reason ? `\uC0AC\uC720: ${refundInput.reason}` : null
  ].filter(Boolean);
  return {
    contractNumber: getRefundContractNumber(sourceContract, refundInput.refundDate),
    contractDate: refundInput.refundDate,
    contractName: null,
    managerId: sourceContract.managerId || void 0,
    managerName: sourceContract.managerName,
    customerId: sourceContract.customerId || void 0,
    customerName: sourceContract.customerName,
    products: productName,
    cost: negativeRefundAmount,
    days: refundDays > 0 ? -refundDays : 0,
    quantity: refundQuantity,
    addQuantity,
    extendQuantity,
    paymentConfirmed: false,
    paymentMethod: PAYMENT_METHOD_REFUND_REQUEST,
    depositBank: normalizeContractDepositBank(sourceContract.depositBank, sourceContract.paymentMethod),
    invoiceIssued: sourceContract.invoiceIssued,
    worker: normalizeText(refundInput.worker || sourceItem?.worker || sourceContract.worker),
    workCost: negativeRefundWorkCost,
    notes: noteParts.join(" / "),
    disbursementStatus: "",
    executionPaymentStatus: "\uC785\uAE08\uC608\uC815",
    userIdentifier,
    productDetailsJson,
    contractType: CONTRACT_TYPE_REFUND,
    sourceContractId: sourceContract.id,
    sourceItemId: sourceItemId || null
  };
}
function computeContractWorkCostFromProducts(contract, allProducts, allProductRateHistories = []) {
  const productMap = new Map(allProducts.map((product) => [product.name, product]));
  const historyMap = buildProductHistoryMap(allProductRateHistories);
  const storedProductDetails = parseContractProductDetailsForWorkCost(contract.productDetailsJson);
  if (storedProductDetails.length > 0) {
    const computedFromDetails = storedProductDetails.reduce((sum, item) => {
      const productName = String(item.productName || "").trim();
      if (!productName) return sum;
      if (item.fixedWorkCostAmount !== null && item.fixedWorkCostAmount !== void 0) {
        return sum + Math.max(Number(item.fixedWorkCostAmount) || 0, 0);
      }
      const matched = resolveProductSnapshotByDate(
        productName,
        contract.contractDate,
        productMap,
        historyMap
      );
      const quantity2 = getContractQuantityForWorkCost(item);
      const days2 = Math.max(Number(item.days) || 1, 1);
      const workerUnitCost = Math.max(Number(item.workCost) || 0, Number(matched?.workCost) || 0, 0);
      if (workerUnitCost <= 0) return sum;
      const workerBaseDays = Math.max(Number(item.baseDays) || 0, Number(matched?.baseDays) || 0, 1);
      return sum + Math.round(workerUnitCost / workerBaseDays * days2 * quantity2);
    }, 0);
    if (computedFromDetails > 0) return computedFromDetails;
  }
  const quantity = getContractQuantityForWorkCost(contract);
  const days = Math.max(Number(contract.days) || 1, 1);
  const productNames = String(contract.products || "").split(",").map((name) => name.trim()).filter(Boolean);
  if (productNames.length > 0) {
    const computed = productNames.reduce((sum, productName) => {
      const matched = resolveProductSnapshotByDate(
        productName,
        contract.contractDate,
        productMap,
        historyMap
      );
      const workerUnitCost = Math.max(Number(matched?.workCost) || 0, 0);
      if (workerUnitCost <= 0) return sum;
      const workerBaseDays = Math.max(Number(matched?.baseDays) || 1, 1);
      return sum + Math.round(workerUnitCost / workerBaseDays * days * quantity);
    }, 0);
    if (computed > 0) return computed;
  }
  return Math.max(Number(contract.workCost) || 0, 0);
}
async function registerRoutes(httpServer2, app2) {
  if (!shouldRunRuntimeSchemaEnsure() && hasDatabaseConfig) {
    try {
      await ensureCustomerKeepColumns();
      await ensureCustomerLifecycleSeedData();
    } catch (error) {
      console.warn("Customer lifecycle ensure skipped:", error);
    }
  }
  if (shouldRunRuntimeSchemaEnsure()) {
    await ensureCustomerDetailTables();
    await ensureDealCustomerDbColumns();
    await ensureRegionalUnpaidTable();
    await ensureRegionalManagementFeeTable();
    await ensureRegionalCustomerListTable();
    await ensureCustomerKeepColumns();
    await ensureCustomerLifecycleSeedData();
    await ensureDepartmentNameSpacing();
    await ensureProductColumns();
    await ensureContractColumns();
    await ensureFinancialHistoryColumns();
    await ensureDepositRefundMatchesTable();
  }
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { loginId, password } = req.body;
      if (!loginId || !password) {
        return res.status(400).json({ error: "\uC544\uC774\uB514\uC640 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." });
      }
      if (isLocalAdminLogin(loginId, password)) {
        req.session.regenerate((err) => {
          if (err) {
            console.error("Session regeneration error:", err);
            return res.status(500).json({ error: "Login failed." });
          }
          req.session.userId = LOCAL_ADMIN_USER_ID;
          req.session.save((saveErr) => {
            if (saveErr) {
              console.error("Session save error:", saveErr);
              return res.status(500).json({ error: "Login failed." });
            }
            res.clearCookie("crm_logged_out");
            return res.json(localAdminUser);
          });
        });
        return;
      }
      const user = await storage.getUserByLoginId(loginId);
      if (!user) {
        return res.status(401).json({ error: "\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
      }
      if (!user.isActive) {
        return res.status(403).json({ error: "\uBE44\uD65C\uC131\uD654\uB41C \uACC4\uC815\uC785\uB2C8\uB2E4." });
      }
      if (isWorkStatusBlockedForLogin(user.workStatus)) {
        const blockedStatus = normalizeWorkStatus(user.workStatus);
        return res.status(403).json({ error: `${blockedStatus} \uC0C1\uD0DC \uACC4\uC815\uC740 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.` });
      }
      const oldSession = req.session;
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ error: "\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
        }
        req.session.userId = user.id;
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error("Session save error:", saveErr);
            return res.status(500).json({ error: "\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
          }
          res.clearCookie("crm_logged_out");
          const { password: _, ...safeUser } = user;
          storage.createSystemLog({
            userId: user.id,
            loginId: user.loginId,
            userName: user.name,
            action: "\uC2DC\uC2A4\uD15C\uC5D0 \uB85C\uADF8\uC778\uD588\uC2B5\uB2C8\uB2E4.",
            actionType: "login",
            ipAddress: req.ip || req.socket.remoteAddress || "",
            userAgent: req.headers["user-agent"] || ""
          }).catch((err2) => console.error("Login log error:", err2));
          res.json(safeUser);
        });
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.post("/api/auth/logout", async (req, res) => {
    const userId = req.session.userId;
    let logUser = null;
    if (userId) {
      logUser = getLocalAdminUserBySession(userId);
    }
    if (userId && !logUser) {
      try {
        logUser = await storage.getUser(userId);
      } catch (_) {
      }
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "\uB85C\uADF8\uC544\uC6C3\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
      }
      if (logUser) {
        storage.createSystemLog({
          userId: logUser.id,
          loginId: logUser.loginId,
          userName: logUser.name,
          action: "\uC2DC\uC2A4\uD15C\uC5D0\uC11C \uB85C\uADF8\uC544\uC6C3\uD588\uC2B5\uB2C8\uB2E4.",
          actionType: "logout",
          ipAddress: req.ip || req.socket.remoteAddress || "",
          userAgent: req.headers["user-agent"] || ""
        }).catch((err2) => console.error("Logout log error:", err2));
      }
      res.clearCookie("crm.sid");
      res.cookie("crm_logged_out", "1", { httpOnly: true, sameSite: "lax" });
      res.json({ success: true });
    });
  });
  app2.get("/api/auth/me", autoLoginDev, async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const localUser = getLocalAdminUserBySession(req.session.userId);
    if (localUser) {
      return res.json(localUser);
    }
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        req.session.destroy(() => {
        });
        return res.status(401).json({ error: "User not found" });
      }
      const { password: _, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });
  app2.put("/api/auth/profile", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: "Not authenticated" });
      let pwMinLength = 8;
      try {
        const pwSetting = await storage.getSystemSetting("password_min_length");
        if (pwSetting) pwMinLength = parseInt(pwSetting.settingValue) || 8;
      } catch {
      }
      const profileSchema = z.object({
        phone: z.string().optional(),
        email: z.string().email("\uC62C\uBC14\uB978 \uC774\uBA54\uC77C \uD615\uC2DD\uC774 \uC544\uB2D9\uB2C8\uB2E4.").optional().or(z.literal("")),
        currentPassword: z.string().optional(),
        newPassword: z.string().min(pwMinLength, `\uBE44\uBC00\uBC88\uD638\uB294 \uCD5C\uC18C ${pwMinLength}\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.`).regex(/[A-Za-z]/, "\uBE44\uBC00\uBC88\uD638\uC5D0 \uC601\uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.").regex(/[0-9]/, "\uBE44\uBC00\uBC88\uD638\uC5D0 \uC22B\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.").regex(/[!@#$%^&*(),.?":{}|<>]/, "\uBE44\uBC00\uBC88\uD638\uC5D0 \uD2B9\uC218\uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.").optional()
      });
      const parsed = profileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0]?.message || "\uC798\uBABB\uB41C \uC694\uCCAD\uC785\uB2C8\uB2E4." });
      }
      const { phone, email, currentPassword, newPassword } = parsed.data;
      const currentUser = await storage.getUser(userId);
      if (!currentUser) return res.status(404).json({ error: "\uC0AC\uC6A9\uC790\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      const updateData = {};
      if (phone !== void 0) updateData.phone = phone;
      if (email !== void 0) updateData.email = email || null;
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ error: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." });
        }
        const valid = await bcrypt.compare(currentPassword, currentUser.password);
        if (!valid) {
          return res.status(400).json({ error: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
        }
        updateData.password = await bcrypt.hash(newPassword, 10);
        updateData.lastPasswordChangeAt = /* @__PURE__ */ new Date();
      }
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "\uBCC0\uACBD\uD560 \uC815\uBCF4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const updated = await storage.updateUser(userId, updateData);
      if (!updated) return res.status(500).json({ error: "\uC5C5\uB370\uC774\uD2B8\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
      const { password: _, ...safeUser } = updated;
      res.json(safeUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "\uD504\uB85C\uD544 \uC5C5\uB370\uC774\uD2B8\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  function isPermissionAdminRole(role) {
    const normalizedRole = String(role || "").trim();
    return PERMISSION_ADMIN_ROLES.includes(normalizedRole) || INTENDED_PERMISSION_ADMIN_ROLES.includes(normalizedRole);
  }
  function isExecutiveUser(user) {
    if (!user) return false;
    return isPermissionAdminRole(user.role) || EXECUTIVE_DEPARTMENTS.has(String(user.department || "").trim());
  }
  async function hasPermissionSettingsAccess(user) {
    if (!user?.id) return false;
    if (isPermissionAdminRole(user.role)) return true;
    const permissions = await storage.getPagePermissionsByUser(user.id);
    return permissions.some((permission) => permission.pageKey === "permissions");
  }
  async function requireExecutiveUserManagement(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
    }
    const currentUser = await storage.getUser(req.session.userId);
    if (!isExecutiveUser(currentUser)) {
      return res.status(403).json({ error: "\uC0AC\uC6A9\uC790 \uB4F1\uB85D, \uC0AD\uC81C, \uC804\uCCB4 \uC218\uC815\uC740 \uACBD\uC601\uC9C4\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4." });
    }
    next();
  }
  async function requirePermissionSettingsAccess(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
    }
    const currentUser = await storage.getUser(req.session.userId);
    if (!await hasPermissionSettingsAccess(currentUser)) {
      return res.status(403).json({ error: "\uAD8C\uD55C\uC124\uC815 \uAD8C\uD55C\uC774 \uC788\uB294 \uC0AC\uC6A9\uC790\uB9CC \uAD8C\uD55C\uC744 \uBD80\uC5EC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
    }
    next();
  }
  async function requireAdmin(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
    }
    const currentUser = await storage.getUser(req.session.userId);
    if (!currentUser || !isPermissionAdminRole(currentUser.role)) {
      return res.status(403).json({ error: "\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
    }
    next();
  }
  async function requireDepositActionAllowed(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Login is required." });
    }
    const currentUser = await storage.getUser(req.session.userId);
    const userDepartment = String(currentUser?.department || "").trim();
    const userRole = String(currentUser?.role || "").trim();
    const canManageDeposits = DEPOSIT_ACTION_ALLOWED_DEPARTMENTS.has(userDepartment) || PERMISSION_ADMIN_ROLES.includes(userRole);
    if (!canManageDeposits) {
      return res.status(403).json({ error: "\uC785\uAE08\uC644\uB8CC \uB4F1\uB85D, \uC5D1\uC140 \uC5C5\uB85C\uB4DC, \uC218\uC815, \uC0AD\uC81C\uB294 \uACBD\uC601\uC9C0\uC6D0\uD300/\uAC1C\uBC1C\uD300 \uB610\uB294 \uB300\uD45C\uC774\uC0AC/\uCD1D\uAD04\uC774\uC0AC/\uAC1C\uBC1C\uC790\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4." });
    }
    next();
  }
  async function requireRegionalCustomerListManageAllowed(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Login is required." });
    }
    const currentUser = await storage.getUser(req.session.userId);
    const userDepartment = String(currentUser?.department || "").trim();
    const userRole = String(currentUser?.role || "").trim();
    const canManageRegionalCustomerList = REGIONAL_CUSTOMER_LIST_ALLOWED_DEPARTMENTS.has(userDepartment) || PERMISSION_ADMIN_ROLES.includes(userRole);
    if (!canManageRegionalCustomerList) {
      return res.status(403).json({ error: "\uACE0\uAC1D\uB9AC\uC2A4\uD2B8 \uB4F1\uB85D, \uC218\uC815, \uC0AD\uC81C\uB294 \uD0C0\uC9C0\uC5ED\uD300 \uB610\uB294 \uB300\uD45C\uC774\uC0AC/\uCD1D\uAD04\uC774\uC0AC/\uAC1C\uBC1C\uC790\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4." });
    }
    next();
  }
  app2.use("/api/users", requireAuth);
  app2.use("/api/customers", requireAuth);
  app2.use("/api/contacts", requireAuth);
  app2.use("/api/deals", requireAuth);
  app2.use("/api/activities", requireAuth);
  app2.use("/api/payments", requireAuth);
  app2.use("/api/system-logs", requireAuth);
  app2.use("/api/products", requireAuth);
  app2.use("/api/product-rate-histories", requireAuth);
  app2.use("/api/renewal-alerts", requireAuth);
  app2.use("/api/contracts", requireAuth);
  app2.use("/api/refunds", requireAuth);
  app2.use("/api/permissions", requireAuth);
  app2.use("/api/system-settings", requireAuth);
  app2.use("/api/stats", requireAuth);
  app2.get("/api/users", async (_req, res) => {
    try {
      const users2 = await storage.getUsers();
      const safeUsers = users2.map(({ password: _, ...u }) => u);
      res.json(safeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  async function getPasswordPolicy() {
    let minLength = 8;
    try {
      const setting = await storage.getSystemSetting("password_min_length");
      if (setting) minLength = parseInt(setting.settingValue) || 8;
    } catch {
    }
    return z.string().min(minLength, `\uBE44\uBC00\uBC88\uD638\uB294 ${minLength}\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.`).regex(/[A-Za-z]/, "\uBE44\uBC00\uBC88\uD638\uC5D0 \uC601\uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.").regex(/[0-9]/, "\uBE44\uBC00\uBC88\uD638\uC5D0 \uC22B\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.").regex(/[!@#$%^&*(),.?":{}|<>]/, "\uBE44\uBC00\uBC88\uD638\uC5D0 \uD2B9\uC218\uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
  }
  app2.post("/api/users", requireExecutiveUserManagement, requirePermissionSettingsAccess, async (req, res) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid user data", details: parsed.error });
      }
      const passwordPolicy = await getPasswordPolicy();
      const pwCheck = passwordPolicy.safeParse(parsed.data.password);
      if (!pwCheck.success) {
        return res.status(400).json({ error: pwCheck.error.errors[0]?.message || "\uBE44\uBC00\uBC88\uD638 \uC815\uCC45\uC744 \uCDA9\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
      }
      parsed.data.password = await bcrypt.hash(parsed.data.password, 10);
      const user = await storage.createUser(parsed.data);
      const role = parsed.data.role;
      const defaultPages = role ? filterAssignablePageKeys(positionDefaultPages[role] ?? []) : [];
      if (defaultPages.length > 0) {
        await storage.setPagePermissions(user.id, defaultPages);
      }
      const { password: _p, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error?.code === "23505" || error?.constraint?.includes("login_id")) {
        return res.status(400).json({ error: "\uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uB85C\uADF8\uC778ID\uC785\uB2C8\uB2E4." });
      }
      res.status(500).json({ error: error?.message || "\uC0AC\uC6A9\uC790 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.put("/api/users/:id", async (req, res) => {
    try {
      const userId = toSingleString(req.params.id);
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (!currentUser) {
        return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
      }
      const oldUser = await storage.getUser(userId);
      if (!oldUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const parsed = insertUserSchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid user data", details: parsed.error });
      }
      const requestedFields = Object.keys(parsed.data);
      const canEditAllUserFields = isExecutiveUser(currentUser);
      const canGrantPermissions = await hasPermissionSettingsAccess(currentUser);
      const isSelfEdit = currentUser.id === userId;
      if (!canEditAllUserFields) {
        if (!isSelfEdit) {
          return res.status(403).json({ error: "\uB2E4\uB978 \uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC218\uC815\uC740 \uACBD\uC601\uC9C4\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4." });
        }
        const forbiddenFields = requestedFields.filter((field) => !USER_SELF_EDIT_FIELDS.has(field));
        if (forbiddenFields.length > 0) {
          return res.status(403).json({ error: "\uC77C\uBC18 \uC0AC\uC6A9\uC790\uB294 \uBCF8\uC778 \uBE44\uBC00\uBC88\uD638, \uC774\uBA54\uC77C, \uC5F0\uB77D\uCC98\uB9CC \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
        }
      }
      if (requestedFields.some((field) => USER_PERMISSION_FIELDS.has(field)) && !canGrantPermissions) {
        return res.status(403).json({ error: "\uAD8C\uD55C\uC124\uC815 \uAD8C\uD55C\uC774 \uC788\uB294 \uC0AC\uC6A9\uC790\uB9CC \uC9C1\uCC45\uC744 \uBCC0\uACBD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      if (parsed.data.password) {
        const passwordPolicy = await getPasswordPolicy();
        const pwCheck = passwordPolicy.safeParse(parsed.data.password);
        if (!pwCheck.success) {
          return res.status(400).json({ error: pwCheck.error.errors[0]?.message || "\uBE44\uBC00\uBC88\uD638 \uC815\uCC45\uC744 \uCDA9\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
        }
        parsed.data.password = await bcrypt.hash(parsed.data.password, 10);
      }
      const user = await storage.updateUser(userId, parsed.data);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (parsed.data.role && parsed.data.role !== oldUser?.role) {
        const defaultPages = filterAssignablePageKeys(positionDefaultPages[parsed.data.role] ?? []);
        await storage.setPagePermissions(user.id, defaultPages);
      }
      const { password: _pw, ...safeUpdated } = user;
      res.json(safeUpdated);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  app2.delete("/api/users/:id", requireExecutiveUserManagement, async (req, res) => {
    try {
      const userId = toSingleString(req.params.id);
      await storage.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });
  app2.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      const contracts2 = await storage.getContractsWithFinancials();
      const users2 = await storage.getUsers();
      const activities2 = await storage.getActivities();
      const totalSales = contracts2.reduce((sum, c) => sum + getEffectiveSalesAmount(c), 0);
      const totalRefunds = contracts2.reduce((sum, c) => sum + (c.totalRefund || 0), 0);
      const confirmedCount = contracts2.filter((c) => c.paymentConfirmed).length;
      const now = /* @__PURE__ */ new Date();
      const currentMonthKey = getKoreanYearMonthKey(now) || "";
      const lastMonthKey = currentMonthKey ? shiftKoreanYearMonthKey(currentMonthKey, -1) : "";
      const monthlyMap = {};
      contracts2.forEach((c) => {
        const key = getKoreanYearMonthKey(c.contractDate);
        if (!key) return;
        if (!monthlyMap[key]) monthlyMap[key] = { sales: 0, refunds: 0, count: 0 };
        monthlyMap[key].sales += getEffectiveSalesAmount(c);
        monthlyMap[key].refunds += c.totalRefund || 0;
        monthlyMap[key].count += 1;
      });
      const monthlyRevenue = Object.entries(monthlyMap).sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([key, val]) => {
        const [, monthPart = "0"] = key.split("-");
        const monthNumber = Number.parseInt(monthPart, 10) || 0;
        return {
          month: String(monthNumber) + "\uC6D4",
          yearMonth: key,
          sales: val.sales,
          refunds: val.refunds,
          netSales: val.sales - val.refunds,
          count: val.count
        };
      });
      const currentMonthSales = monthlyMap[currentMonthKey]?.sales || 0;
      const lastMonthSales = monthlyMap[lastMonthKey]?.sales || 0;
      const growthRate = lastMonthSales > 0 ? Math.round((currentMonthSales - lastMonthSales) / lastMonthSales * 1e3) / 10 : 0;
      const deptMap = {};
      contracts2.forEach((c) => {
        const mgr = users2.find((u) => u.id === c.managerId || u.name === c.managerName);
        const dept = mgr?.department || "\uBBF8\uC9C0\uC815";
        if (!deptMap[dept]) deptMap[dept] = { sales: 0, count: 0, target: 100 };
        deptMap[dept].sales += getEffectiveSalesAmount(c);
        deptMap[dept].count += 1;
      });
      const settings = await storage.getSystemSettings();
      const targetSetting = settings.find((s) => s.settingKey === "monthly_sales_target");
      const monthlyTarget = targetSetting ? parseInt(targetSetting.settingValue) : 5e7;
      const departmentPerformance = Object.entries(deptMap).sort(([, a], [, b]) => b.sales - a.sales).map(([dept, val]) => ({
        team: dept,
        target: 100,
        achieved: monthlyTarget > 0 ? Math.round(val.sales / monthlyTarget * 100) : 0,
        sales: val.sales,
        count: val.count
      }));
      const weekActivity = {};
      const dayNames = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"];
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
      activities2.filter((a) => new Date(a.createdAt) >= oneWeekAgo).forEach((a) => {
        const day = dayNames[new Date(a.createdAt).getDay()];
        if (!weekActivity[day]) weekActivity[day] = { calls: 0, meetings: 0, emails: 0, notes: 0 };
        if (a.type === "call") weekActivity[day].calls += 1;
        else if (a.type === "meeting") weekActivity[day].meetings += 1;
        else if (a.type === "email") weekActivity[day].emails += 1;
        else weekActivity[day].notes += 1;
      });
      const activityTrend = ["\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08"].map((day) => ({
        day,
        calls: weekActivity[day]?.calls || 0,
        meetings: weekActivity[day]?.meetings || 0,
        emails: weekActivity[day]?.emails || 0
      }));
      res.json({
        ...stats,
        totalSales,
        totalRefunds,
        netSales: totalSales - totalRefunds,
        confirmedCount,
        contractCount: contracts2.length,
        currentMonthSales,
        lastMonthSales,
        growthRate,
        monthlyRevenue,
        departmentPerformance,
        activityTrend
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
  app2.get("/api/stats/personal", requireAuth, async (req, res) => {
    try {
      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }
      const startDateValue = toSingleString(req.query.startDate);
      const endDateValue = toSingleString(req.query.endDate);
      const contracts2 = await storage.getContractsWithFinancials();
      const activities2 = await storage.getActivities();
      const hasFullDashboardAccess = PERMISSION_ADMIN_ROLES.includes(currentUser.role || "");
      const currentUserNameKey = normalizeText(currentUser.name);
      const isMyContract = (contract) => currentUserNameKey !== "" && normalizeText(contract.managerName) === currentUserNameKey;
      let targetContracts = hasFullDashboardAccess ? contracts2 : contracts2.filter((contract) => isMyContract(contract));
      let myActivities = hasFullDashboardAccess ? activities2 : activities2.filter((activity) => activity.userId === currentUser.id);
      if (startDateValue || endDateValue) {
        targetContracts = targetContracts.filter(
          (contract) => isWithinKoreanDateRange(contract.contractDate, startDateValue || void 0, endDateValue || void 0)
        );
        myActivities = myActivities.filter(
          (activity) => isWithinKoreanDateRange(activity.createdAt, startDateValue || void 0, endDateValue || void 0)
        );
      }
      const totalSales = targetContracts.reduce((sum, c) => sum + getEffectiveSalesAmount(c), 0);
      const totalRefunds = targetContracts.reduce((sum, c) => sum + (c.totalRefund || 0), 0);
      const contractCount = targetContracts.length;
      const avgContractValue = contractCount > 0 ? Math.round(totalSales / contractCount) : 0;
      const referenceDate = endDateValue ? /* @__PURE__ */ new Date(`${endDateValue}T12:00:00+09:00`) : /* @__PURE__ */ new Date();
      const safeReferenceDate = Number.isNaN(referenceDate.getTime()) ? /* @__PURE__ */ new Date() : referenceDate;
      const currentMonthKey = getKoreanYearMonthKey(safeReferenceDate) || "";
      const lastMonthKey = currentMonthKey ? shiftKoreanYearMonthKey(currentMonthKey, -1) : "";
      const monthlyMap = {};
      targetContracts.forEach((c) => {
        const key = getKoreanYearMonthKey(c.contractDate);
        if (!key) return;
        if (!monthlyMap[key]) monthlyMap[key] = { sales: 0, refunds: 0, count: 0 };
        monthlyMap[key].sales += getEffectiveSalesAmount(c);
        monthlyMap[key].refunds += c.totalRefund || 0;
        monthlyMap[key].count += 1;
      });
      const monthlyRevenue = Object.entries(monthlyMap).sort(([a], [b]) => a.localeCompare(b)).slice(-6).map(([key, val]) => ({
        month: `${parseInt(key.split("-")[1], 10)}\uC6D4`,
        yearMonth: key,
        \uB9E4\uCD9C: val.sales,
        \uD658\uBD88: val.refunds,
        \uC21C\uB9E4\uCD9C: val.sales - val.refunds,
        \uAC74\uC218: val.count
      }));
      const currentMonthSales = monthlyMap[currentMonthKey]?.sales || 0;
      const lastMonthSales = monthlyMap[lastMonthKey]?.sales || 0;
      const growthRate = lastMonthSales > 0 ? Math.round((currentMonthSales - lastMonthSales) / lastMonthSales * 1e3) / 10 : 0;
      const productMap = {};
      targetContracts.forEach((c) => {
        const productName = c.products || "\uAE30\uD0C0";
        if (!productMap[productName]) productMap[productName] = 0;
        productMap[productName] += getEffectiveSalesAmount(c);
      });
      const productColors = ["#135bec", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ef4444", "#ec4899"];
      const productDistribution = Object.entries(productMap).sort(([, a], [, b]) => b - a).map(([name, sales], i) => ({
        name,
        value: totalSales > 0 ? Math.round(sales / totalSales * 100) : 0,
        sales,
        color: productColors[i % productColors.length]
      }));
      res.json({
        isExecutive: hasFullDashboardAccess,
        user: {
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role,
          department: currentUser.department || "",
          workStatus: currentUser.workStatus || ""
        },
        totalSales,
        totalRefunds,
        netSales: totalSales - totalRefunds,
        contractCount,
        avgContractValue,
        currentMonthSales,
        lastMonthSales,
        growthRate,
        monthlyRevenue,
        productDistribution,
        activityCount: myActivities.length
      });
    } catch (error) {
      console.error("Error fetching personal stats:", error);
      res.status(500).json({ error: "Failed to fetch personal stats" });
    }
  });
  const customerFileUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }
  });
  app2.get("/api/customers", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      const rawCustomers = await storage.getCustomers();
      const customers2 = isCounselorPosition(currentUser?.role) ? rawCustomers.filter((customer) => isCustomerLifecycleStage(customer.lifecycleStage, "lead")) : rawCustomers;
      if (customers2.length === 0) {
        res.json(customers2);
        return;
      }
      const latestCounselingByCustomerId = /* @__PURE__ */ new Map();
      const counselingCountByCustomerId = /* @__PURE__ */ new Map();
      const companyConvertedAtByCustomerId = /* @__PURE__ */ new Map();
      try {
        await ensureCustomerDetailTables();
        const counselingResult = await pool.query(
          `
            SELECT DISTINCT ON (customer_id)
                   customer_id AS "customerId",
                   counseling_date AS "lastCounselingDate",
                   content,
                   created_at AS "lastCounselingCreatedAt"
            FROM customer_counselings
            ORDER BY customer_id, counseling_date DESC, created_at DESC
          `
        );
        counselingResult.rows.forEach((row) => {
          const decrypted = decryptRawTableRow("customer_counselings", row);
          latestCounselingByCustomerId.set(String(decrypted.customerId), decrypted);
        });
        const counselingCountResult = await pool.query(
          `
            SELECT customer_id AS "customerId", COUNT(*)::int AS "counselingCount"
            FROM customer_counselings
            GROUP BY customer_id
          `
        );
        counselingCountResult.rows.forEach((row) => {
          counselingCountByCustomerId.set(String(row.customerId), Number(row.counselingCount) || 0);
        });
        const convertedAtResult = await pool.query(
          `
            SELECT customer_id AS "customerId", MAX(created_at) AS "companyConvertedAt"
            FROM customer_change_histories
            WHERE change_type = 'convert_to_company'
            GROUP BY customer_id
          `
        );
        convertedAtResult.rows.forEach((row) => {
          if (row.companyConvertedAt) {
            companyConvertedAtByCustomerId.set(String(row.customerId), row.companyConvertedAt);
          }
        });
      } catch (counselingError) {
        console.warn("Customer latest counseling data skipped:", counselingError);
      }
      res.json(
        customers2.map((customer) => {
          const latestCounseling = latestCounselingByCustomerId.get(String(customer.id));
          return serializeCustomerTimeFields({
            ...customer,
            lastCounselingDate: latestCounseling?.lastCounselingDate ?? null,
            lastCounselingContent: latestCounseling?.content ?? null,
            lastCounselingCreatedAt: latestCounseling?.lastCounselingCreatedAt ?? null,
            counselingCount: counselingCountByCustomerId.get(String(customer.id)) ?? 0,
            companyConvertedAt: companyConvertedAtByCustomerId.get(String(customer.id)) ?? null
          });
        })
      );
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });
  app2.get("/api/customers/:id", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      if (isCounselorPosition(currentUser?.role) && !isCustomerLifecycleStage(customer.lifecycleStage, "lead")) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uB9AC\uB4DC \uC815\uBCF4\uB9CC \uC870\uD68C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      res.json(serializeCustomerTimeFields(customer));
    } catch (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Failed to fetch customer" });
    }
  });
  app2.post("/api/customers", async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      const body = { ...req.body ?? {} };
      body.lifecycleStage = isCounselorPosition(currentUser?.role) ? "lead" : body.lifecycleStage === "lead" ? "lead" : "customer";
      if (body.lifecycleStage === "customer") {
        body.customerType = "\uACC4\uC57D\uC644\uB8CC";
      }
      normalizeLeadCustomerPayload(body);
      const parsed = insertCustomerSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid customer data", details: parsed.error });
      }
      if (isCustomerLifecycleStage(parsed.data.lifecycleStage, "lead") && normalizeDuplicatePhone(parsed.data.phone).length === 0) {
        return res.status(400).json({ error: "\uB9AC\uB4DC \uB4F1\uB85D \uC2DC \uC804\uD654\uBC88\uD638\uB294 \uD544\uC218\uC785\uB2C8\uB2E4. \uBC88\uD638\uAC00 \uC5C6\uC73C\uBA74 010-0000-0000\uC744 \uC785\uB825\uD558\uC138\uC694." });
      }
      const duplicate = await findLeadCustomerDuplicate(parsed.data);
      if (duplicate) {
        return res.status(409).json({ error: duplicateLeadCustomerMessage(duplicate) });
      }
      parsed.data.createdByName = currentUser?.name || "system";
      parsed.data.createdByUserId = currentUser?.id || null;
      const customer = await storage.createCustomer(parsed.data);
      res.status(201).json(customer);
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({ error: "Failed to create customer" });
    }
  });
  app2.put("/api/customers/:id", async (req, res) => {
    try {
      const body = { ...req.body ?? {} };
      if (body.lifecycleStage === "customer") {
        body.customerType = "\uACC4\uC57D\uC644\uB8CC";
      }
      normalizeLeadCustomerPayload(body);
      const parsed = insertCustomerSchema.partial().safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid customer data", details: parsed.error });
      }
      const beforeCustomer = await storage.getCustomer(req.params.id);
      if (!beforeCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        if (!isCustomerLifecycleStage(beforeCustomer.lifecycleStage, "lead")) {
          return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uB9AC\uB4DC \uC815\uBCF4\uB9CC \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
        }
        if (parsed.data.lifecycleStage === "customer") {
          return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uACE0\uAC1D\uC0AC \uC804\uD658\uC744 \uC218\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
        }
      }
      const isAdminUser = isPermissionAdminRole(currentUser?.role);
      const isCompanyCustomer = isCustomerLifecycleStage(beforeCustomer.lifecycleStage, "customer");
      const requestedName = typeof parsed.data.name === "string" ? parsed.data.name.trim() : void 0;
      if (isCompanyCustomer && !isAdminUser && requestedName !== void 0 && requestedName !== String(beforeCustomer.name || "").trim()) {
        return res.status(403).json({ error: "\uACE0\uAC1D\uC0AC (\uD68C\uC0AC\uBA85)\uC740 \uAD00\uB9AC\uC790\uB9CC \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      if (isCompanyCustomer && !isAdminUser && parsed.data.lifecycleStage === "lead") {
        return res.status(403).json({ error: "\uACE0\uAC1D\uC0AC\uB294 \uB9AC\uB4DC\uB85C \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const duplicate = await findLeadCustomerDuplicate(
        {
          name: parsed.data.name ?? beforeCustomer.name,
          phone: parsed.data.phone ?? beforeCustomer.phone
        },
        req.params.id
      );
      if (duplicate) {
        return res.status(409).json({ error: duplicateLeadCustomerMessage(duplicate) });
      }
      const customer = await storage.updateCustomer(req.params.id, parsed.data);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const changedKeys = Object.keys(parsed.data).filter((key) => {
        const beforeValue = beforeCustomer[key] ?? null;
        const afterValue = customer[key] ?? null;
        return String(beforeValue ?? "") !== String(afterValue ?? "");
      });
      if (changedKeys.length > 0) {
        const beforeData = {};
        const afterData = {};
        changedKeys.forEach((key) => {
          beforeData[key] = beforeCustomer[key] ?? null;
          afterData[key] = customer[key] ?? null;
        });
        const encryptedChangeHistory = encryptRawTablePayload("customer_change_histories", {
          before_data: JSON.stringify(beforeData),
          after_data: JSON.stringify(afterData)
        });
        await pool.query(
          `
            INSERT INTO customer_change_histories (
              customer_id, change_type, changed_fields, before_data, after_data, created_by
            ) VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            req.params.id,
            "update",
            changedKeys.join(","),
            encryptedChangeHistory.before_data,
            encryptedChangeHistory.after_data,
            await getCurrentUserName(req)
          ]
        );
      }
      await writeEntityAuditLog(
        req,
        "customer",
        "update",
        customer.name || req.params.id,
        `customerId=${req.params.id}, fields=${Object.keys(parsed.data).join(",") || "-"}`
      );
      res.json(customer);
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Failed to update customer" });
    }
  });
  app2.post("/api/customers/:id/convert-to-company", async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uACE0\uAC1D\uC0AC \uC804\uD658\uC744 \uC218\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const beforeCustomer = await storage.getCustomer(req.params.id);
      if (!beforeCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      if (isCustomerLifecycleStage(beforeCustomer.lifecycleStage, "customer")) {
        return res.json(beforeCustomer);
      }
      const customer = await convertCustomerToCompany(req.params.id, currentUser?.name || await getCurrentUserName(req));
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const encryptedChangeHistory = encryptRawTablePayload("customer_change_histories", {
        before_data: JSON.stringify({
          lifecycleStage: beforeCustomer.lifecycleStage,
          customerType: beforeCustomer.customerType,
          managerName: beforeCustomer.managerName
        }),
        after_data: JSON.stringify({
          lifecycleStage: customer.lifecycleStage,
          customerType: customer.customerType,
          managerName: customer.managerName
        })
      });
      await pool.query(
        `
          INSERT INTO customer_change_histories (
            customer_id, change_type, changed_fields, before_data, after_data, created_by
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          req.params.id,
          "convert_to_company",
          "lifecycleStage,customerType,managerName",
          encryptedChangeHistory.before_data,
          encryptedChangeHistory.after_data,
          await getCurrentUserName(req)
        ]
      );
      await writeEntityAuditLog(
        req,
        "customer",
        "update",
        customer.name || req.params.id,
        `customerId=${req.params.id}, action=convert_to_company`
      );
      res.json(customer);
    } catch (error) {
      console.error("Error converting customer to company:", error);
      res.status(500).json({ error: "Failed to convert customer to company" });
    }
  });
  app2.delete("/api/customers/:id", async (req, res) => {
    try {
      const customer = await storage.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uB9AC\uB4DC\uC640 \uACE0\uAC1D\uC0AC\uB97C \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      if (isCustomerLifecycleStage(customer.lifecycleStage, "customer") && !isPermissionAdminRole(currentUser?.role)) {
        return res.status(403).json({ error: "\uACE0\uAC1D\uC0AC\uB294 \uAD00\uB9AC\uC790\uB9CC \uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      const contractCount = await getContractCountByCustomerId(req.params.id);
      if (contractCount > 0) {
        return res.status(409).json({
          error: "\uACC4\uC57D\uC774 \uC5F0\uACB0\uB41C \uACE0\uAC1D\uC740 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBA3C\uC800 \uC5F0\uACB0\uB41C \uACC4\uC57D\uC744 \uC815\uB9AC\uD574\uC8FC\uC138\uC694.",
          contractCount
        });
      }
      await storage.deleteCustomer(req.params.id);
      await writeEntityAuditLog(
        req,
        "customer",
        "delete",
        customer.name || req.params.id,
        `customerId=${req.params.id}`
      );
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Failed to delete customer" });
    }
  });
  app2.get("/api/customers/:id/counselings", async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        const customer = await storage.getCustomer(String(req.params.id));
        if (!customer || !isCustomerLifecycleStage(customer.lifecycleStage, "lead")) {
          return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uB9AC\uB4DC \uC0C1\uB2F4\uB9CC \uC870\uD68C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
        }
      }
      const result = await pool.query(
        `
          SELECT id, customer_id AS "customerId", counseling_date AS "counselingDate",
                 content, created_by AS "createdBy", created_at AS "createdAt"
          FROM customer_counselings
          WHERE customer_id = $1
          ORDER BY counseling_date DESC, created_at DESC
        `,
        [req.params.id]
      );
      res.json(
        result.rows.map((row) => serializeCustomerTimeFields(decryptRawTableRow("customer_counselings", row)))
      );
    } catch (error) {
      console.error("Error fetching customer counselings:", error);
      res.status(500).json({ error: "Failed to fetch customer counselings" });
    }
  });
  app2.post("/api/customers/:id/counselings", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const schema = z.object({
        counselingDate: z.string().min(1),
        content: z.string().min(1)
      });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid counseling data", details: parsed.error });
      }
      const { counselingDate, content } = parsed.data;
      const parsedDate = new Date(counselingDate);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid counseling date" });
      }
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        const customer = await storage.getCustomer(String(req.params.id));
        if (!customer || !isCustomerLifecycleStage(customer.lifecycleStage, "lead")) {
          return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uB9AC\uB4DC \uC0C1\uB2F4\uB9CC \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
        }
      }
      const inserted = await pool.query(
        `
          INSERT INTO customer_counselings (customer_id, counseling_date, content, created_by)
          VALUES ($1, $2, $3, $4)
          RETURNING id, customer_id AS "customerId", counseling_date AS "counselingDate",
                    content, created_by AS "createdBy", created_at AS "createdAt"
        `,
        [
          req.params.id,
          parsedDate,
          encryptRawTablePayload("customer_counselings", { content: content.trim() }).content,
          await getCurrentUserName(req)
        ]
      );
      res.status(201).json(serializeCustomerTimeFields(decryptRawTableRow("customer_counselings", inserted.rows[0])));
    } catch (error) {
      console.error("Error creating customer counseling:", error);
      res.status(500).json({ error: "Failed to create customer counseling" });
    }
  });
  app2.delete("/api/customers/:id/counselings/:counselingId", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uC0C1\uB2F4 \uC774\uB825\uC744 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      await pool.query(
        `DELETE FROM customer_counselings WHERE id = $1 AND customer_id = $2`,
        [req.params.counselingId, req.params.id]
      );
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting customer counseling:", error);
      res.status(500).json({ error: "Failed to delete customer counseling" });
    }
  });
  app2.get("/api/customers/:id/change-history", async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uBCC0\uACBD\uC774\uB825\uC744 \uC870\uD68C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const result = await pool.query(
        `
          SELECT id, customer_id AS "customerId", change_type AS "changeType",
                 changed_fields AS "changedFields", before_data AS "beforeData",
                 after_data AS "afterData", created_by AS "createdBy", created_at AS "createdAt"
          FROM customer_change_histories
          WHERE customer_id = $1
          ORDER BY created_at DESC
        `,
        [req.params.id]
      );
      res.json(
        result.rows.map(
          (row) => serializeCustomerTimeFields(decryptRecordFields(row, CUSTOMER_CHANGE_HISTORY_RESPONSE_PII_FIELDS))
        )
      );
    } catch (error) {
      console.error("Error fetching customer change history:", error);
      res.status(500).json({ error: "Failed to fetch customer change history" });
    }
  });
  app2.get("/api/customers/:id/files", async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uD30C\uC77C \uC815\uBCF4\uB97C \uC870\uD68C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const result = await pool.query(
        `
          SELECT id, customer_id AS "customerId", file_name AS "fileName",
                 mime_type AS "mimeType", size_bytes AS "sizeBytes",
                 uploaded_by AS "uploadedBy", note, created_at AS "createdAt"
          FROM customer_files
          WHERE customer_id = $1
          ORDER BY created_at DESC
        `,
        [req.params.id]
      );
      res.json(
        result.rows.map((row) => {
          const decrypted = decryptRecordFields(row, CUSTOMER_FILE_RESPONSE_PII_FIELDS);
          return serializeCustomerTimeFields({
            ...decrypted,
            fileName: normalizeCustomerFileName(decrypted.fileName),
            note: typeof decrypted.note === "string" && decrypted.note.trim() ? decrypted.note.trim() : null
          });
        })
      );
    } catch (error) {
      console.error("Error fetching customer files:", error);
      res.status(500).json({ error: "Failed to fetch customer files" });
    }
  });
  app2.post("/api/customers/:id/files", autoLoginDev, requireAuth, customerFileUpload.single("file"), async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uD30C\uC77C\uC744 \uB4F1\uB85D\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      if (!req.file) {
        return res.status(400).json({ error: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const countResult = await pool.query(
        `SELECT COUNT(*)::int AS count FROM customer_files WHERE customer_id = $1`,
        [req.params.id]
      );
      const currentCount = Number(countResult.rows[0]?.count || 0);
      if (currentCount >= 5) {
        return res.status(400).json({ error: "\uD30C\uC77C\uC740 \uCD5C\uB300 5\uAC1C\uAE4C\uC9C0 \uB4F1\uB85D \uAC00\uB2A5\uD569\uB2C8\uB2E4." });
      }
      const metadataSchema = z.object({
        note: z.string().trim().max(200).optional().or(z.literal(""))
      });
      const metadata = metadataSchema.safeParse(req.body ?? {});
      if (!metadata.success) {
        return res.status(400).json({ error: "Invalid customer file metadata", details: metadata.error });
      }
      const normalizedFileName = normalizeCustomerFileName(req.file.originalname);
      const fileData = req.file.buffer.toString("base64");
      const encryptedCustomerFile = encryptRawTablePayload("customer_files", {
        file_name: normalizedFileName,
        original_file_name: req.file.originalname,
        file_data: fileData,
        note: metadata.data.note?.trim() || null
      });
      const inserted = await pool.query(
        `
          INSERT INTO customer_files (
            customer_id, file_name, original_file_name, mime_type, size_bytes, file_data, uploaded_by, note
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id, customer_id AS "customerId", file_name AS "fileName",
                    mime_type AS "mimeType", size_bytes AS "sizeBytes",
                    uploaded_by AS "uploadedBy", note, created_at AS "createdAt"
        `,
        [
          req.params.id,
          encryptedCustomerFile.file_name,
          encryptedCustomerFile.original_file_name,
          req.file.mimetype || null,
          req.file.size || 0,
          encryptedCustomerFile.file_data,
          await getCurrentUserName(req),
          encryptedCustomerFile.note
        ]
      );
      const decryptedInserted = decryptRecordFields(inserted.rows[0], CUSTOMER_FILE_RESPONSE_PII_FIELDS);
      res.status(201).json(serializeCustomerTimeFields({
        ...decryptedInserted,
        fileName: normalizeCustomerFileName(decryptedInserted?.fileName),
        note: typeof decryptedInserted?.note === "string" && decryptedInserted.note.trim() ? decryptedInserted.note.trim() : null
      }));
    } catch (error) {
      console.error("Error uploading customer file:", error);
      res.status(500).json({ error: "Failed to upload customer file" });
    }
  });
  app2.get("/api/customers/:id/files/:fileId/download", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uD30C\uC77C\uC744 \uB2E4\uC6B4\uB85C\uB4DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const result = await pool.query(
        `
          SELECT id, customer_id, file_name, original_file_name, mime_type, file_data
          FROM customer_files
          WHERE id = $1 AND customer_id = $2
          LIMIT 1
        `,
        [req.params.fileId, req.params.id]
      );
      const file = result.rows[0];
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      const decryptedFile = decryptRawTableRow("customer_files", file);
      const fileBuffer = Buffer.from(String(decryptedFile.file_data || ""), "base64");
      const downloadFileName = normalizeCustomerFileName(decryptedFile.file_name || decryptedFile.original_file_name);
      res.setHeader("Content-Type", file.mime_type || "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${toAsciiDownloadFileName(downloadFileName)}"; filename*=UTF-8''${encodeURIComponent(downloadFileName)}`
      );
      res.send(fileBuffer);
    } catch (error) {
      console.error("Error downloading customer file:", error);
      res.status(500).json({ error: "Failed to download customer file" });
    }
  });
  app2.delete("/api/customers/:id/files/:fileId", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const currentUser = await getSessionUser(req);
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      await pool.query(
        `DELETE FROM customer_files WHERE id = $1 AND customer_id = $2`,
        [req.params.fileId, req.params.id]
      );
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting customer file:", error);
      res.status(500).json({ error: "Failed to delete customer file" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const customerId = req.query.customerId;
      const contacts2 = await storage.getContacts(customerId);
      res.json(contacts2);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid contact data", details: parsed.error });
      }
      const contact = await storage.createContact(parsed.data);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Failed to create contact" });
    }
  });
  app2.delete("/api/contacts/:id", async (req, res) => {
    try {
      await storage.deleteContact(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });
  app2.get("/api/deals", async (_req, res) => {
    try {
      const loadedDeals = await storage.getDeals();
      const partialCancelDateByDealId = /* @__PURE__ */ new Map();
      const dealIds = loadedDeals.map((deal) => deal.id).filter(Boolean);
      if (dealIds.length > 0) {
        const timelineRows = await db.select({
          dealId: dealTimelines.dealId,
          content: dealTimelines.content,
          createdAt: dealTimelines.createdAt
        }).from(dealTimelines).where(inArray2(dealTimelines.dealId, dealIds));
        for (const row of timelineRows) {
          if (!String(row.content || "").startsWith("[\uBD80\uBD84\uD574\uC9C0]")) continue;
          const existing = partialCancelDateByDealId.get(row.dealId);
          const createdAt = row.createdAt ?? null;
          if (!existing || createdAt && createdAt > existing) {
            partialCancelDateByDealId.set(row.dealId, createdAt);
          }
        }
      }
      const adjustedDeals = loadedDeals.map((deal) => ({
        ...deal,
        contractStatus: normalizeRegionalDealContractStatus(deal.contractStatus, deal.stage) || getRegionalDealStageLabel(deal.stage),
        inboundDate: normalizeRegionalDealDate(deal.inboundDate ?? deal.expectedCloseDate) ?? deal.inboundDate,
        contractStartDate: normalizeRegionalDealDate(deal.contractStartDate),
        contractEndDate: normalizeRegionalDealDate(deal.contractEndDate),
        churnDate: normalizeRegionalDealDate(deal.churnDate),
        latestPartialCancelDate: normalizeRegionalDealDate(partialCancelDateByDealId.get(deal.id) ?? null)
      }));
      res.json(adjustedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      res.status(500).json({ error: "Failed to fetch deals" });
    }
  });
  app2.get("/api/deals/:id", async (req, res) => {
    try {
      const deal = await storage.getDeal(req.params.id);
      if (!deal) {
        return res.status(404).json({ error: "Deal not found" });
      }
      res.json(deal);
    } catch (error) {
      console.error("Error fetching deal:", error);
      res.status(500).json({ error: "Failed to fetch deal" });
    }
  });
  app2.post("/api/deals", async (req, res) => {
    try {
      const body = { ...req.body };
      const dateFields = [
        "expectedCloseDate",
        "inboundDate",
        "contractStartDate",
        "contractEndDate",
        "churnDate",
        "renewalDueDate"
      ];
      for (const field of dateFields) {
        if (body[field] && typeof body[field] === "string") {
          body[field] = new Date(body[field]);
        } else if (body[field] === "") {
          body[field] = null;
        }
      }
      body.expectedCloseDate = normalizeRegionalDealDate(body.expectedCloseDate);
      body.inboundDate = normalizeRegionalDealDate(body.inboundDate) ?? body.expectedCloseDate ?? null;
      body.contractStartDate = normalizeRegionalDealDate(body.contractStartDate);
      body.contractEndDate = normalizeRegionalDealDate(body.contractEndDate) ?? addDaysToKoreanDate(body.contractStartDate, 1);
      body.churnDate = normalizeRegionalDealDate(body.churnDate);
      body.renewalDueDate = null;
      if ("contractStatus" in body) {
        body.contractStatus = normalizeRegionalDealContractStatus(body.contractStatus, body.stage);
        if (body.contractStatus === "\uBCC0\uACBD") {
          body.contractStatus = REGIONAL_CHANGED_STATUS_SENTINEL;
        }
      }
      if (!body.contractStatus && body.stage) {
        body.contractStatus = getRegionalDealStageLabel(body.stage);
      }
      if (!body.stage && body.contractStatus) {
        body.stage = getRegionalDealStageFromStatus(body.contractStatus) || "new";
      }
      if (body.stage === "churned" || normalizeRegionalDealContractStatus(body.contractStatus, body.stage) === "\uD574\uC9C0") {
        body.churnDate = body.churnDate ?? normalizeRegionalDealDate(/* @__PURE__ */ new Date());
      }
      const parsed = insertDealSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid deal data", details: parsed.error });
      }
      const deal = await storage.createDeal(parsed.data);
      const stageLabel = getRegionalDealStageLabel(deal.stage);
      const tz = await getSystemTimezone();
      const dateStr = deal.inboundDate ? formatServerDate(new Date(deal.inboundDate), tz) : formatServerDate(/* @__PURE__ */ new Date(), tz);
      await createDealTimelineAndSync({
        dealId: deal.id,
        content: `[${stageLabel}] ${dateStr} \uB4F1\uB85D`,
        authorId: null,
        authorName: "\uC2DC\uC2A4\uD15C"
      });
      if (deal.cancellationReason && deal.cancellationReason.trim()) {
        await ensureDealCancellationReasonTimeline({
          dealId: deal.id,
          reason: deal.cancellationReason.trim(),
          reasonDate: deal.churnDate ?? deal.createdAt ?? /* @__PURE__ */ new Date(),
          authorId: null,
          authorName: "\uC2DC\uC2A4\uD15C"
        });
      }
      if (deal.notes && deal.notes.trim()) {
        await ensureDealNoteTimeline({
          dealId: deal.id,
          note: deal.notes,
          authorId: null,
          authorName: "\uC2DC\uC2A4\uD15C"
        });
      }
      if (deal.customerId) {
        const customer = await storage.getCustomer(deal.customerId);
        await storage.createActivity({
          type: "note",
          description: `\uC0C8\uB85C\uC6B4 \uAC70\uB798 "${deal.title}"\uAC00 ${customer?.name || "\uACE0\uAC1D"}\uC5D0 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`,
          customerId: deal.customerId,
          dealId: deal.id
        });
      }
      res.status(201).json({
        ...deal,
        contractStatus: normalizeRegionalDealContractStatus(deal.contractStatus, deal.stage) || stageLabel,
        contractEndDate: normalizeRegionalDealDate(deal.contractEndDate),
        churnDate: normalizeRegionalDealDate(deal.churnDate)
      });
    } catch (error) {
      console.error("Error creating deal:", error);
      res.status(500).json({ error: "Failed to create deal" });
    }
  });
  app2.put("/api/deals/:id", async (req, res) => {
    try {
      const body = { ...req.body };
      const stageOrStatusProvided = "stage" in body || "contractStatus" in body;
      const dateFields = [
        "expectedCloseDate",
        "inboundDate",
        "contractStartDate",
        "contractEndDate",
        "churnDate",
        "renewalDueDate"
      ];
      for (const field of dateFields) {
        if (body[field] && typeof body[field] === "string") {
          body[field] = new Date(body[field]);
        } else if (body[field] === "") {
          body[field] = null;
        }
      }
      if ("expectedCloseDate" in body) body.expectedCloseDate = normalizeRegionalDealDate(body.expectedCloseDate);
      if ("inboundDate" in body || "expectedCloseDate" in body) {
        body.inboundDate = normalizeRegionalDealDate(body.inboundDate) ?? body.expectedCloseDate ?? null;
      }
      if ("contractStartDate" in body) body.contractStartDate = normalizeRegionalDealDate(body.contractStartDate);
      if ("contractEndDate" in body || "contractStartDate" in body) {
        body.contractEndDate = normalizeRegionalDealDate(body.contractEndDate) ?? addDaysToKoreanDate(body.contractStartDate, 1);
      }
      if ("churnDate" in body) body.churnDate = normalizeRegionalDealDate(body.churnDate);
      if ("renewalDueDate" in body) body.renewalDueDate = null;
      if ("contractStatus" in body) {
        body.contractStatus = normalizeRegionalDealContractStatus(body.contractStatus, body.stage);
        if (body.contractStatus === "\uBCC0\uACBD") {
          body.contractStatus = REGIONAL_CHANGED_STATUS_SENTINEL;
        }
      }
      if (!body.contractStatus && body.stage) {
        body.contractStatus = getRegionalDealStageLabel(body.stage);
      }
      if (!body.stage && body.contractStatus) {
        body.stage = getRegionalDealStageFromStatus(body.contractStatus) || void 0;
      }
      if (body.stage === "churned" || normalizeRegionalDealContractStatus(body.contractStatus, body.stage) === "\uD574\uC9C0") {
        body.churnDate = body.churnDate ?? normalizeRegionalDealDate(/* @__PURE__ */ new Date());
      } else if (stageOrStatusProvided) {
        body.churnDate = null;
      }
      const parsed = insertDealSchema.partial().safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid deal data", details: parsed.error });
      }
      const existingDeal = await storage.getDeal(req.params.id);
      if (!existingDeal) {
        return res.status(404).json({ error: "Deal not found" });
      }
      const updatePayload = { ...parsed.data };
      if (parsed.data.stage && existingDeal.stage !== parsed.data.stage) {
        if (parsed.data.stage === "churned" && existingDeal.stage !== "churned") {
          updatePayload.preChurnStage = existingDeal.stage;
        } else if (existingDeal.stage === "churned" && parsed.data.stage !== "churned") {
          updatePayload.preChurnStage = null;
        }
      }
      const deal = await storage.updateDeal(req.params.id, updatePayload);
      if (!deal) {
        return res.status(404).json({ error: "Deal not found" });
      }
      if (existingDeal && parsed.data.stage && existingDeal.stage !== parsed.data.stage) {
        const fromLabel = getRegionalDealStageLabel(existingDeal.stage);
        const toLabel = getRegionalDealStageLabel(parsed.data.stage);
        const changeTz = await getSystemTimezone();
        const changeDate = formatServerDate(/* @__PURE__ */ new Date(), changeTz);
        const userId = req.session?.userId;
        let authorName = "\uC2DC\uC2A4\uD15C";
        if (userId) {
          const user = await storage.getUser(userId);
          if (user) authorName = user.name;
        }
        await createDealTimelineAndSync({
          dealId: deal.id,
          content: `[${toLabel}] ${changeDate} \uC0C1\uD0DC \uBCC0\uACBD (${fromLabel} -> ${toLabel})`,
          authorId: userId || null,
          authorName
        });
      }
      const oldCancellationReason = (existingDeal.cancellationReason || "").trim();
      const newCancellationReason = (deal.cancellationReason || "").trim();
      if (newCancellationReason && newCancellationReason !== oldCancellationReason) {
        const userId = req.session?.userId;
        let authorName = "\uC2DC\uC2A4\uD15C";
        if (userId) {
          const user = await storage.getUser(userId);
          if (user) authorName = user.name;
        }
        await ensureDealCancellationReasonTimeline({
          dealId: deal.id,
          reason: newCancellationReason,
          reasonDate: deal.churnDate ?? /* @__PURE__ */ new Date(),
          authorId: userId || null,
          authorName
        });
      }
      const oldNote = (existingDeal.notes || "").trim();
      const newNote = (deal.notes || "").trim();
      if (newNote && newNote !== oldNote) {
        const userId = req.session?.userId;
        let authorName = "\uC2DC\uC2A4\uD15C";
        if (userId) {
          const user = await storage.getUser(userId);
          if (user) authorName = user.name;
        }
        await ensureDealNoteTimeline({
          dealId: deal.id,
          note: newNote,
          authorId: userId || null,
          authorName
        });
      }
      res.json({
        ...deal,
        contractStatus: normalizeRegionalDealContractStatus(deal.contractStatus, deal.stage) || getRegionalDealStageLabel(deal.stage),
        contractEndDate: normalizeRegionalDealDate(deal.contractEndDate),
        churnDate: normalizeRegionalDealDate(deal.churnDate)
      });
    } catch (error) {
      console.error("Error updating deal:", error);
      res.status(500).json({ error: "Failed to update deal" });
    }
  });
  app2.post("/api/deals/:id/reinstate", async (req, res) => {
    try {
      const deal = await storage.getDeal(req.params.id);
      if (!deal) {
        return res.status(404).json({ error: "Deal not found" });
      }
      if (deal.stage !== "churned") {
        return res.status(400).json({ error: "\uD574\uC9C0 \uC0C1\uD0DC\uAC00 \uC544\uB2CC \uACE0\uAC1D\uC740 \uD574\uC9C0\uCCA0\uD68C \uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const restoreStage = deal.preChurnStage === "new" || deal.preChurnStage === "active" ? deal.preChurnStage : "active";
      const restoreLineCount = Math.max(
        Number(deal.lineCount) || 0,
        Number(deal.cancelledLineCount) || 0,
        0
      );
      const restoredDeal = await storage.updateDeal(req.params.id, {
        stage: restoreStage,
        contractStatus: getRegionalDealStageLabel(restoreStage),
        preChurnStage: null,
        lineCount: restoreLineCount,
        cancelledLineCount: 0,
        churnDate: null
      });
      if (!restoredDeal) {
        return res.status(500).json({ error: "Failed to restore deal" });
      }
      const changeTz = await getSystemTimezone();
      const changeDate = formatServerDate(/* @__PURE__ */ new Date(), changeTz);
      const userId = req.session?.userId;
      let authorName = "\uC2DC\uC2A4\uD15C";
      if (userId) {
        const user = await storage.getUser(userId);
        if (user) authorName = user.name;
      }
      await createDealTimelineAndSync({
        dealId: restoredDeal.id,
        content: `[${getRegionalDealStageLabel(restoreStage)}] ${changeDate} \uD574\uC9C0 \uCCA0\uD68C (\uD574\uC9C0 -> ${getRegionalDealStageLabel(restoreStage)})`,
        authorId: userId || null,
        authorName
      });
      res.json({
        ...restoredDeal,
        contractStatus: normalizeRegionalDealContractStatus(restoredDeal.contractStatus, restoredDeal.stage),
        churnDate: null
      });
    } catch (error) {
      console.error("Error reinstating deal:", error);
      res.status(500).json({ error: "Failed to reinstate deal" });
    }
  });
  const addLinesSchema = z.object({
    addCount: z.coerce.number().int().min(1, "\uCD94\uAC00 \uD68C\uC120 \uC218\uB294 1 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.")
  });
  app2.post("/api/deals/:id/add-lines", async (req, res) => {
    try {
      const parsed = addLinesSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0]?.message || "\uC798\uBABB\uB41C \uC694\uCCAD\uC785\uB2C8\uB2E4." });
      }
      const deal = await storage.getDeal(req.params.id);
      if (!deal) {
        return res.status(404).json({ error: "\uAC70\uB798\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const currentLines = Math.max(Number(deal.lineCount) || 0, 0);
      const currentCancelled = Math.max(Number(deal.cancelledLineCount) || 0, 0);
      const currentRemainingLines = Math.max(currentLines - currentCancelled, 0);
      if (deal.stage === "churned" || currentRemainingLines <= 0) {
        return res.status(400).json({ error: "\uD574\uC9C0\uB41C \uACE0\uAC1D\uC5D0\uB294 \uD68C\uC120\uC744 \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const newLineCount = currentLines + parsed.data.addCount;
      const newRemainingLines = Math.max(newLineCount - currentCancelled, 0);
      const updatedDeal = await storage.updateDeal(req.params.id, {
        lineCount: newLineCount
      });
      if (!updatedDeal) {
        return res.status(500).json({ error: "\uD68C\uC120\uC218 \uC5C5\uB370\uC774\uD2B8\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
      }
      const userId = req.session?.userId;
      let authorName = "\uC2DC\uC2A4\uD15C";
      if (userId) {
        const user = await storage.getUser(userId);
        if (user) authorName = user.name;
      }
      const tz = await getSystemTimezone();
      const addedDate = formatServerDate(/* @__PURE__ */ new Date(), tz);
      const openedDate = formatServerDate(addDaysToKoreanDate(/* @__PURE__ */ new Date(), 1) ?? /* @__PURE__ */ new Date(), tz);
      await createDealTimelineAndSync({
        dealId: deal.id,
        content: `[\uD68C\uC120\uCD94\uAC00] \uCD94\uAC00\uC77C ${addedDate} / \uAC1C\uD1B5\uC77C ${openedDate} / ${parsed.data.addCount}\uD68C\uC120 \uCD94\uAC00 (${currentRemainingLines} -> ${newRemainingLines})`,
        authorId: userId || null,
        authorName
      });
      res.json({
        ...updatedDeal,
        contractStatus: normalizeRegionalDealContractStatus(updatedDeal.contractStatus, updatedDeal.stage) || getRegionalDealStageLabel(updatedDeal.stage),
        contractEndDate: normalizeRegionalDealDate(updatedDeal.contractEndDate) ?? addDaysToKoreanDate(updatedDeal.contractStartDate, 1),
        churnDate: normalizeRegionalDealDate(updatedDeal.churnDate)
      });
    } catch (error) {
      console.error("Error adding deal lines:", error);
      res.status(500).json({ error: "Failed to add lines" });
    }
  });
  const partialCancelSchema = z.object({
    cancelCount: z.coerce.number().int().min(1, "\uD574\uC9C0 \uD68C\uC120 \uC218\uB294 1 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."),
    reason: z.string().optional().default("")
  });
  app2.post("/api/deals/:id/partial-cancel", async (req, res) => {
    try {
      const parsed = partialCancelSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0]?.message || "\uC798\uBABB\uB41C \uC694\uCCAD\uC785\uB2C8\uB2E4." });
      }
      const { cancelCount, reason } = parsed.data;
      const normalizedReason = reason?.trim() || "";
      const deal = await storage.getDeal(req.params.id);
      if (!deal) {
        return res.status(404).json({ error: "\uAC70\uB798\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const currentLines = Math.max(deal.lineCount || 0, 0);
      const splitRows = await db.select({
        cancelledLineCount: deals.cancelledLineCount
      }).from(deals).where(eq2(deals.parentDealId, deal.id));
      const currentCancelled = Math.max(deal.cancelledLineCount || 0, 0) + splitRows.reduce((sum, row) => sum + Math.max(Number(row.cancelledLineCount) || 0, 0), 0);
      const remainingLines = Math.max(currentLines - currentCancelled, 0);
      const newRemainingLineCount = Math.max(remainingLines - cancelCount, 0);
      if (cancelCount > remainingLines) {
        return res.status(400).json({ error: `\uD604\uC7AC \uC794\uC5EC \uD68C\uC120\uC218(${remainingLines})\uBCF4\uB2E4 \uB9CE\uC774 \uD574\uC9C0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.` });
      }
      if (cancelCount >= remainingLines) {
        return res.status(400).json({ error: "\uC804\uCCB4 \uC794\uC5EC \uD68C\uC120\uC218\uB97C \uD574\uC9C0\uD560 \uB54C\uB294 \uD574\uC9C0 \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD574\uC8FC\uC138\uC694." });
      }
      const userId = req.session?.userId;
      let authorName = "\uC2DC\uC2A4\uD15C";
      if (userId) {
        const user = await storage.getUser(userId);
        if (user) authorName = user.name;
      }
      const cancelTz = await getSystemTimezone();
      const cancelDate = formatServerDate(/* @__PURE__ */ new Date(), cancelTz);
      const reasonText = normalizedReason ? ` (\uC0AC\uC720: ${normalizedReason})` : "";
      await createDealTimelineAndSync({
        dealId: deal.id,
        content: `[\uBD80\uBD84\uD574\uC9C0] ${cancelDate} ${cancelCount}\uD68C\uC120 \uD574\uC9C0 (${remainingLines} -> ${newRemainingLineCount})${reasonText}`,
        authorId: userId || null,
        authorName
      });
      if (normalizedReason) {
        await ensureDealCancellationReasonTimeline({
          dealId: deal.id,
          reason: normalizedReason,
          reasonDate: /* @__PURE__ */ new Date(),
          authorId: userId || null,
          authorName
        });
      }
      const splitDeal = await storage.createDeal({
        parentDealId: deal.id,
        title: deal.title,
        customerId: deal.customerId,
        value: deal.value || 0,
        stage: "churned",
        probability: deal.probability || 0,
        expectedCloseDate: deal.expectedCloseDate,
        inboundDate: deal.inboundDate,
        contractStartDate: deal.contractStartDate,
        contractEndDate: deal.contractEndDate,
        churnDate: normalizeRegionalDealDate(/* @__PURE__ */ new Date()),
        renewalDueDate: deal.renewalDueDate,
        contractStatus: "\uD574\uC9C0",
        notes: "",
        phone: deal.phone,
        email: deal.email,
        billingAccountNumber: deal.billingAccountNumber,
        companyName: deal.companyName,
        industry: deal.industry,
        telecomProvider: deal.telecomProvider,
        customerDisposition: deal.customerDisposition,
        customerTypeDetail: deal.customerTypeDetail,
        firstProgressStatus: deal.firstProgressStatus,
        secondProgressStatus: deal.secondProgressStatus,
        additionalProgressStatus: deal.additionalProgressStatus,
        acquisitionChannel: deal.acquisitionChannel,
        cancellationReason: normalizedReason || null,
        salesperson: deal.salesperson,
        preChurnStage: getRegionalDealStageLabel(deal.stage),
        lineCount: 0,
        cancelledLineCount: cancelCount,
        productId: deal.productId
      });
      await createDealTimelineAndSync({
        dealId: splitDeal.id,
        content: `[\uBD80\uBD84\uD574\uC9C0] ${cancelDate} ${cancelCount}\uD68C\uC120 \uD574\uC9C0${reasonText}`,
        authorId: userId || null,
        authorName
      });
      if (normalizedReason) {
        await ensureDealCancellationReasonTimeline({
          dealId: splitDeal.id,
          reason: normalizedReason,
          reasonDate: /* @__PURE__ */ new Date(),
          authorId: userId || null,
          authorName
        });
      }
      res.json({
        ...splitDeal,
        contractStatus: normalizeRegionalDealContractStatus(splitDeal.contractStatus, splitDeal.stage) || getRegionalDealStageLabel(splitDeal.stage),
        contractEndDate: normalizeRegionalDealDate(splitDeal.contractEndDate) ?? addDaysToKoreanDate(splitDeal.contractStartDate, 1),
        churnDate: normalizeRegionalDealDate(splitDeal.churnDate)
      });
    } catch (error) {
      console.error("Error partial cancel deal:", error);
      res.status(500).json({ error: "Failed to partial cancel" });
    }
  });
  app2.delete("/api/deals/:id", async (req, res) => {
    try {
      await storage.deleteDeal(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting deal:", error);
      res.status(500).json({ error: "Failed to delete deal" });
    }
  });
  app2.get("/api/deals/:dealId/timelines", async (req, res) => {
    try {
      const timelines = await storage.getDealTimelines(req.params.dealId);
      res.json(timelines);
    } catch (error) {
      console.error("Error fetching timelines:", error);
      res.status(500).json({ error: "Failed to fetch timelines" });
    }
  });
  app2.post("/api/deals/:dealId/timelines", async (req, res) => {
    try {
      const userId = req.session?.userId;
      let authorName = req.body.authorName || null;
      let authorId = null;
      if (userId) {
        const user = await storage.getUser(userId);
        if (user) {
          authorId = user.id;
          authorName = user.name;
        }
      }
      const parsed = insertDealTimelineSchema.safeParse({
        content: req.body.content,
        dealId: req.params.dealId,
        authorId,
        authorName
      });
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid timeline data", details: parsed.error });
      }
      const timeline = await createDealTimelineAndSync(parsed.data);
      res.status(201).json(timeline);
    } catch (error) {
      console.error("Error creating timeline:", error);
      res.status(500).json({ error: "Failed to create timeline" });
    }
  });
  app2.delete("/api/deals/timelines/:id", async (req, res) => {
    try {
      const timelineRows = await pool.query(
        `SELECT deal_id FROM deal_timelines WHERE id = $1 LIMIT 1`,
        [req.params.id]
      );
      const dealId = timelineRows.rows[0]?.deal_id;
      await storage.deleteDealTimeline(req.params.id);
      if (dealId) {
        await syncDealNotesFromLatestTimeline(dealId);
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting timeline:", error);
      res.status(500).json({ error: "Failed to delete timeline" });
    }
  });
  app2.get("/api/activities", async (_req, res) => {
    try {
      const activities2 = await storage.getActivities();
      res.json(activities2);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });
  app2.post("/api/activities", async (req, res) => {
    try {
      const parsed = insertActivitySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid activity data", details: parsed.error });
      }
      const activity = await storage.createActivity(parsed.data);
      res.status(201).json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({ error: "Failed to create activity" });
    }
  });
  app2.delete("/api/activities/:id", async (req, res) => {
    try {
      await storage.deleteActivity(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.status(500).json({ error: "Failed to delete activity" });
    }
  });
  app2.get("/api/payments", async (_req, res) => {
    try {
      const payments2 = await storage.getPayments();
      res.json(payments2);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });
  app2.post("/api/payments", async (req, res) => {
    try {
      const parsed = insertPaymentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payment data", details: parsed.error });
      }
      const payment = await storage.createPayment(parsed.data);
      res.status(201).json(payment);
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ error: "Failed to create payment" });
    }
  });
  app2.put("/api/payments/:id", async (req, res) => {
    try {
      const parsed = insertPaymentSchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payment data", details: parsed.error });
      }
      const payment = await storage.updatePayment(req.params.id, parsed.data);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(500).json({ error: "Failed to update payment" });
    }
  });
  app2.delete("/api/payments/:id", async (req, res) => {
    try {
      await storage.deletePayment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting payment:", error);
      res.status(500).json({ error: "Failed to delete payment" });
    }
  });
  app2.get("/api/system-logs", async (_req, res) => {
    try {
      const logs = await storage.getSystemLogs();
      res.json(logs);
    } catch (error) {
      console.error("Error fetching system logs:", error);
      res.status(500).json({ error: "Failed to fetch system logs" });
    }
  });
  app2.post("/api/system-logs", async (req, res) => {
    try {
      const parsed = insertSystemLogSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid system log data", details: parsed.error });
      }
      const log2 = await storage.createSystemLog(parsed.data);
      res.status(201).json(log2);
    } catch (error) {
      console.error("Error creating system log:", error);
      res.status(500).json({ error: "Failed to create system log" });
    }
  });
  app2.get("/api/products", async (_req, res) => {
    try {
      const products2 = await storage.getProducts();
      res.json(products2);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.get("/api/product-rate-histories", async (req, res) => {
    try {
      const productId = toSingleString(req.query.productId);
      const histories = await storage.getProductRateHistories(productId || void 0);
      res.json(histories);
    } catch (error) {
      console.error("Error fetching product rate histories:", error);
      res.status(500).json({ error: "Failed to fetch product rate histories" });
    }
  });
  app2.post("/api/admin/renewal-backfill", requireAuth, async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (!currentUser || !PERMISSION_ADMIN_ROLES.includes(currentUser.role || "")) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      const result = await backfillContractRenewalSchedule();
      res.json({ ok: true, ...result });
    } catch (error) {
      console.error("Error backfilling renewal schedule:", error);
      res.status(500).json({ error: "Failed to backfill renewal schedule" });
    }
  });
  app2.get("/api/renewal-alerts", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (!currentUser) return res.status(401).json({ error: "Login required" });
      const todayEnd = /* @__PURE__ */ new Date();
      todayEnd.setHours(23, 59, 59, 999);
      const managerId = String(currentUser.id || "").trim() || null;
      const managerName = String(currentUser.name || "").trim();
      const result = await pool.query(
        `
          SELECT
            id,
            manager_id AS "managerId",
            manager_name AS "managerName",
            contract_number AS "contractNumber",
            customer_name AS "customerName",
            products,
            product_details_json AS "productDetailsJson",
            contract_date AS "contractDate",
            renewal_due_date AS "renewalDueDate",
            renewal_alert_disabled AS "renewalAlertDisabled",
            created_at AS "createdAt"
          FROM contracts
          WHERE renewal_due_date IS NOT NULL
            AND COALESCE(renewal_alert_disabled, false) = false
            AND COALESCE(contract_type, '') <> $4
            AND renewal_due_date <= $1
            AND (
              ($2::text IS NOT NULL AND manager_id = $2)
              OR lower(btrim(manager_name)) = lower(btrim($3))
            )
          ORDER BY renewal_due_date ASC, created_at ASC
        `,
        [todayEnd, managerId, managerName, CONTRACT_TYPE_REFUND]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching renewal alerts:", error);
      res.status(500).json({ error: "Failed to fetch renewal alerts" });
    }
  });
  app2.post("/api/renewal-alerts/:contractId/disable", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (!currentUser) return res.status(401).json({ error: "Login required" });
      const managerId = String(currentUser.id || "").trim() || null;
      const managerName = String(currentUser.name || "").trim();
      const result = await pool.query(
        `
          UPDATE contracts
          SET renewal_alert_disabled = true
          WHERE id = $1
            AND (
              ($2::text IS NOT NULL AND manager_id = $2)
              OR lower(btrim(manager_name)) = lower(btrim($3))
            )
          RETURNING contract_number
        `,
        [req.params.contractId, managerId, managerName]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Renewal alert not found" });
      }
      await writeSystemLog(req, {
        actionType: "renewal_alert_disable",
        action: "\uACC4\uC57D\uC5F0\uC7A5 \uC54C\uB9BC \uD574\uC81C",
        details: `contractId=${req.params.contractId}, contractNumber=${result.rows[0]?.contract_number || ""}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error disabling renewal alert:", error);
      res.status(500).json({ error: "Failed to disable renewal alert" });
    }
  });
  app2.post("/api/products", async (req, res) => {
    try {
      const body = { ...req.body ?? {} };
      const effectiveFrom = parseEffectiveFrom(body.effectiveFrom) ?? /* @__PURE__ */ new Date();
      delete body.effectiveFrom;
      const parsed = insertProductSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.createProduct(parsed.data);
      const changedBy = req.session.userId ? (await storage.getUser(req.session.userId))?.name || req.session.userId : null;
      await storage.createProductRateHistory({
        productId: product.id,
        productName: product.name,
        effectiveFrom,
        unitPrice: Number(product.unitPrice) || 0,
        workCost: Number(product.workCost) || 0,
        baseDays: Number(product.baseDays) || 0,
        vatType: product.vatType || "\uBD80\uAC00\uC138\uBCC4\uB3C4",
        worker: product.worker || null,
        changedBy
      });
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });
  app2.put("/api/products/:id", async (req, res) => {
    try {
      const body = { ...req.body ?? {} };
      const effectiveFrom = parseEffectiveFrom(body.effectiveFrom) ?? /* @__PURE__ */ new Date();
      delete body.effectiveFrom;
      const parsed = insertProductSchema.partial().safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const existingProduct = await storage.getProduct(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      const product = await storage.updateProduct(req.params.id, parsed.data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const shouldRecordHistory = ["name", "unitPrice", "workCost", "baseDays", "vatType", "worker"].some((key) => Object.prototype.hasOwnProperty.call(parsed.data, key));
      if (shouldRecordHistory) {
        const changedBy = req.session.userId ? (await storage.getUser(req.session.userId))?.name || req.session.userId : null;
        await storage.createProductRateHistory({
          productId: product.id,
          productName: product.name,
          effectiveFrom,
          unitPrice: Number(product.unitPrice) || 0,
          workCost: Number(product.workCost) || 0,
          baseDays: Number(product.baseDays) || 0,
          vatType: product.vatType || "\uBD80\uAC00\uC138\uBCC4\uB3C4",
          worker: product.worker || null,
          changedBy
        });
      }
      await writeEntityAuditLog(
        req,
        "product",
        "update",
        product.name || req.params.id,
        `productId=${req.params.id}, fields=${Object.keys(parsed.data).join(",") || "-"}`
      );
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const contractCount = await getContractCountByProductReference(product.id, product.name);
      if (contractCount > 0) {
        return res.status(409).json({
          error: "\uACC4\uC57D\uC5D0 \uC5F0\uACB0\uB41C \uC0C1\uD488\uC740 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBA3C\uC800 \uC5F0\uACB0\uB41C \uACC4\uC57D\uC744 \uC815\uB9AC\uD574\uC8FC\uC138\uC694.",
          contractCount
        });
      }
      await storage.deleteProduct(req.params.id);
      await writeEntityAuditLog(
        req,
        "product",
        "delete",
        product.name || req.params.id,
        `productId=${req.params.id}`
      );
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
  app2.get("/api/contracts/paged", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (isCounselorPosition(currentUser?.role)) {
        return res.status(403).json({ error: "\uC0C1\uB2F4\uC6D0\uC740 \uACC4\uC57D\uAD00\uB9AC\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const page = toPositiveInt(req.query.page, 1);
      const pageSize = toPositiveInt(req.query.pageSize, 10);
      const search = toSingleString(req.query.search).trim();
      const contractNumber = toSingleString(req.query.contractNumber).trim();
      const managerName = toSingleString(req.query.manager).trim();
      const customerName = toSingleString(req.query.customer).trim();
      const productCategory = toSingleString(req.query.productCategory).trim();
      const paymentMethod = toSingleString(req.query.payment).trim();
      const sort = toSingleString(req.query.sort).trim();
      const startDate = parseKoreanRangeStart(req.query.startDate);
      const endDate = parseKoreanRangeEnd(req.query.endDate);
      const result = await storage.getContractsPaged({
        page,
        pageSize,
        search: contractNumber ? void 0 : search || void 0,
        contractNumber: contractNumber || void 0,
        managerName: !contractNumber && managerName && managerName !== "all" ? managerName : void 0,
        customerName: !contractNumber && customerName && customerName !== "all" ? customerName : void 0,
        productCategory: !contractNumber && productCategory && productCategory !== "all" ? productCategory : void 0,
        paymentMethod: !contractNumber && paymentMethod && paymentMethod !== "all" ? paymentMethod : void 0,
        sort: sort === "contractDateAsc" || sort === "customerNameAsc" || sort === "contractDateDesc" ? sort : void 0,
        startDate: contractNumber ? void 0 : startDate,
        endDate: contractNumber ? void 0 : endDate
      });
      res.json({
        ...result,
        items: result.items.map((item) => sanitizeFinancialContractRow(item, currentUser?.role))
      });
    } catch (error) {
      console.error("Error fetching paged contracts:", error);
      res.status(500).json({ error: "Failed to fetch contracts" });
    }
  });
  app2.get("/api/contracts", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (isCounselorPosition(currentUser?.role)) {
        return res.json([]);
      }
      const contracts2 = await storage.getContracts();
      res.json(contracts2.map((contract) => sanitizeFinancialContractRow(contract, currentUser?.role)));
    } catch (error) {
      console.error("Error fetching contracts:", error);
      res.status(500).json({ error: "Failed to fetch contracts" });
    }
  });
  app2.post("/api/contracts/bulk-mark-deposit-confirmed", async (req, res) => {
    try {
      const parsed = z.object({
        ids: z.array(z.string().trim().min(1)).min(1)
      }).safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid bulk deposit-confirmed payload", details: parsed.error });
      }
      const uniqueIds = Array.from(new Set(parsed.data.ids.map((id) => id.trim()).filter(Boolean)));
      let updatedCount = 0;
      for (const contractId of uniqueIds) {
        const existingContract = await storage.getContract(contractId);
        if (!existingContract) continue;
        const nextContract = await storage.updateContract(contractId, {
          paymentMethod: PAYMENT_METHOD_DEPOSIT_CONFIRMED,
          paymentConfirmed: true
        });
        if (!nextContract) continue;
        const paymentPayload = buildPaymentPayloadFromContract({
          ...existingContract,
          ...nextContract,
          paymentMethod: PAYMENT_METHOD_DEPOSIT_CONFIRMED,
          paymentConfirmed: true
        });
        const existingPayment = await storage.getPaymentByContractId(contractId);
        if (existingPayment) {
          await storage.updatePaymentByContractId(contractId, paymentPayload);
        } else {
          await storage.createPayment(paymentPayload);
        }
        await upsertAutoDepositConfirmationFromContract(
          { ...existingContract, ...nextContract, paymentMethod: PAYMENT_METHOD_DEPOSIT_CONFIRMED, paymentConfirmed: true },
          String(req.session.userId || "system")
        );
        updatedCount += 1;
      }
      await writeSystemLog(req, {
        actionType: "contract_update",
        action: "\uACC4\uC57D \uACB0\uC81C\uD655\uC778 \uC77C\uAD04\uBCC0\uACBD: \uC785\uAE08\uC644\uB8CC",
        details: `updated=${updatedCount}, ids=${uniqueIds.join(",")}`
      });
      res.json({
        updatedCount,
        paymentMethod: PAYMENT_METHOD_DEPOSIT_CONFIRMED,
        paymentConfirmed: true
      });
    } catch (error) {
      console.error("Error bulk marking contracts as deposit confirmed:", error);
      res.status(500).json({ error: "Failed to bulk mark contracts as deposit confirmed" });
    }
  });
  app2.get("/api/contracts/:id/refund-contracts", async (req, res) => {
    try {
      const contractId = toSingleString(req.params.id).trim();
      const itemId = toSingleString(req.query.itemId).trim();
      const refundContracts = await storage.getRefundContractsBySource(contractId, itemId || void 0);
      res.json(refundContracts);
    } catch (error) {
      console.error("Error fetching refund contracts:", error);
      res.status(500).json({ error: "Failed to fetch refund contracts" });
    }
  });
  app2.post("/api/contracts/refund-entry", async (req, res) => {
    try {
      const body = { ...req.body };
      if (typeof body.refundDate === "string") {
        const normalizedRefundDate = normalizeToKoreanContractDate(body.refundDate);
        body.refundDate = normalizedRefundDate || new Date(body.refundDate);
      }
      body.amount = toWholeAmount(body.amount);
      body.targetAmount = toWholeAmount(body.targetAmount);
      const parsed = insertRefundSchema.parse({
        ...body,
        refundStatus: normalizeRefundStatus(body.refundStatus) ?? REFUND_STATUS_PENDING
      });
      if (parsed.amount <= 0) {
        return res.status(400).json({ error: "Refund amount must be greater than zero." });
      }
      const contract = await storage.getContract(parsed.contractId);
      if (!contract) {
        return res.status(404).json({ error: "Contract not found." });
      }
      if (contract.contractType === CONTRACT_TYPE_REFUND) {
        return res.status(400).json({ error: "Refund contracts cannot be refunded again." });
      }
      const targetAmount = Math.max(0, Number(parsed.targetAmount) || 0);
      const effectiveTargetAmount = targetAmount > 0 ? targetAmount : Math.max(0, Number(contract.cost) || 0);
      if (parsed.amount > effectiveTargetAmount) {
        return res.status(400).json({ error: "Refund amount cannot exceed selected row amount." });
      }
      const [existingRefunds, existingRefundContracts] = await Promise.all([
        storage.getRefundsByContract(parsed.contractId, parsed.itemId || void 0),
        storage.getRefundContractsBySource(parsed.contractId, parsed.itemId || void 0)
      ]);
      const totalRefunded = existingRefunds.reduce((sum, r) => sum + Math.max(Number(r.amount) || 0, 0), 0);
      const totalRefundContractAmount = existingRefundContracts.reduce(
        (sum, refundContract2) => sum + Math.abs(Number(refundContract2.cost) || 0),
        0
      );
      const remainingCost = effectiveTargetAmount - totalRefunded - totalRefundContractAmount;
      if (parsed.amount > remainingCost) {
        return res.status(400).json({ error: "Refund amount cannot exceed remaining selected row amount." });
      }
      const refundContractPayload = insertContractSchema.parse(
        buildRefundContractPayload(contract, parsed, effectiveTargetAmount)
      );
      const refundContract = await storage.createContract(refundContractPayload);
      await writeSystemLog(req, {
        actionType: "contract_create",
        action: `\uACC4\uC57D \uD658\uBD88 \uB4F1\uB85D: ${refundContract.contractNumber}`,
        details: `sourceContractId=${contract.id}, refundContractId=${refundContract.id}, amount=${parsed.amount}`
      });
      res.status(201).json({
        success: true,
        sourceContractId: contract.id,
        refundContract
      });
    } catch (error) {
      console.error("Error creating refund contract:", error);
      res.status(500).json({ error: "Failed to create refund contract" });
    }
  });
  app2.post("/api/contracts", async (req, res) => {
    try {
      const body = { ...req.body };
      if (body.contractDate) {
        const normalizedContractDate = normalizeToKoreanContractDate(body.contractDate);
        if (normalizedContractDate) {
          body.contractDate = normalizedContractDate;
        } else if (typeof body.contractDate === "string") {
          body.contractDate = new Date(body.contractDate);
        }
      }
      body.renewalDueDate = normalizeOptionalContractDateField(body.renewalDueDate);
      const parsed = insertContractSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid contract data", details: parsed.error });
      }
      const normalizedContractData = normalizeContractQuantityPayload({ ...parsed.data });
      normalizedContractData.paymentMethod = normalizeContractPaymentMethod(normalizedContractData.paymentMethod);
      normalizedContractData.depositBank = normalizeContractDepositBank(
        normalizedContractData.depositBank,
        normalizedContractData.paymentMethod
      );
      const [allProducts, allProductRateHistories] = await Promise.all([
        storage.getProducts(),
        storage.getProductRateHistories()
      ]);
      const contractDataWithRenewal = resolveRenewalSchedulePayload(normalizedContractData, allProducts);
      const normalizedWorkCost = computeContractWorkCostFromProducts(
        contractDataWithRenewal,
        allProducts,
        allProductRateHistories
      );
      const contract = await db.transaction(async (tx) => {
        const [createdContract] = await tx.insert(contracts).values({
          ...contractDataWithRenewal,
          contractName: null,
          workCost: normalizedWorkCost
        }).returning();
        await tx.insert(payments).values(buildPaymentPayloadFromContract(createdContract));
        return createdContract;
      });
      await upsertAutoDepositConfirmationFromContract(
        contract,
        String(req.session.userId || "system")
      );
      if (contract.customerId) {
        const linkedCustomer = await storage.getCustomer(contract.customerId);
        if (linkedCustomer && isCustomerLifecycleStage(linkedCustomer.lifecycleStage, "lead")) {
          await convertCustomerToCompany(contract.customerId);
          await writeEntityAuditLog(
            req,
            "customer",
            "update",
            linkedCustomer.name || contract.customerId,
            `customerId=${contract.customerId}, action=auto_convert_by_contract, contractId=${contract.id}`
          );
        }
      }
      res.status(201).json(contract);
    } catch (error) {
      console.error("Error creating contract:", error);
      res.status(500).json({ error: "Failed to create contract" });
    }
  });
  app2.put("/api/contracts/:id", async (req, res) => {
    try {
      const contractId = toSingleString(req.params.id);
      const body = { ...req.body };
      if (body.contractDate) {
        const normalizedContractDate = normalizeToKoreanContractDate(body.contractDate);
        if (normalizedContractDate) {
          body.contractDate = normalizedContractDate;
        } else if (typeof body.contractDate === "string") {
          body.contractDate = new Date(body.contractDate);
        }
      }
      if (Object.prototype.hasOwnProperty.call(body, "renewalDueDate")) {
        body.renewalDueDate = normalizeOptionalContractDateField(body.renewalDueDate);
      }
      const parsed = insertContractSchema.partial().safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid contract data", details: parsed.error });
      }
      const existingContract = await storage.getContract(contractId);
      if (!existingContract) {
        return res.status(404).json({ error: "Contract not found" });
      }
      const normalizedParsedData = normalizeContractQuantityPayload({ ...parsed.data });
      const updatePayload = {
        ...normalizedParsedData,
        contractName: null
      };
      if (Object.prototype.hasOwnProperty.call(normalizedParsedData, "paymentMethod")) {
        updatePayload.paymentMethod = normalizeContractPaymentMethod(normalizedParsedData.paymentMethod);
      }
      if (Object.prototype.hasOwnProperty.call(normalizedParsedData, "depositBank") || Object.prototype.hasOwnProperty.call(normalizedParsedData, "paymentMethod")) {
        updatePayload.depositBank = normalizeContractDepositBank(
          Object.prototype.hasOwnProperty.call(normalizedParsedData, "depositBank") ? normalizedParsedData.depositBank : existingContract.depositBank,
          Object.prototype.hasOwnProperty.call(normalizedParsedData, "paymentMethod") ? updatePayload.paymentMethod : existingContract.paymentMethod
        );
      }
      const shouldRecomputeWorkCost = ["products", "days", "quantity", "addQuantity", "extendQuantity", "workCost"].some((key) => Object.prototype.hasOwnProperty.call(normalizedParsedData, key));
      let allProductsForUpdate;
      if (shouldRecomputeWorkCost) {
        const [allProducts, allProductRateHistories] = await Promise.all([
          storage.getProducts(),
          storage.getProductRateHistories()
        ]);
        allProductsForUpdate = allProducts;
        updatePayload.workCost = computeContractWorkCostFromProducts(
          { ...existingContract, ...normalizedParsedData },
          allProducts,
          allProductRateHistories
        );
      }
      const renewalBasePayload = { ...existingContract, ...normalizedParsedData, ...updatePayload };
      const shouldRecomputeRenewalSchedule = [
        "contractDate",
        "products",
        "days",
        "productDetailsJson",
        "quantity",
        "addQuantity",
        "extendQuantity"
      ].some((key) => Object.prototype.hasOwnProperty.call(normalizedParsedData, key));
      const renewalDurationDays = getRenewalDurationDays(renewalBasePayload);
      if (existingContract.contractType !== CONTRACT_TYPE_REFUND && (shouldRecomputeRenewalSchedule || !Object.prototype.hasOwnProperty.call(normalizedParsedData, "renewalDueDate"))) {
        allProductsForUpdate = allProductsForUpdate || await storage.getProducts();
        const dueOffsetDays = getRenewalDueOffsetDays(renewalBasePayload, allProductsForUpdate);
        const dueDate = getRenewalDueDateForContract(renewalBasePayload.contractDate, dueOffsetDays);
        if (dueDate) updatePayload.renewalDueDate = dueDate;
      }
      if (existingContract.contractType !== CONTRACT_TYPE_REFUND && renewalDurationDays <= 1) {
        updatePayload.renewalAlertDisabled = true;
      }
      const contract = await db.transaction(async (tx) => {
        const [updatedContract] = await tx.update(contracts).set(updatePayload).where(eq2(contracts.id, contractId)).returning();
        if (!updatedContract) {
          return void 0;
        }
        const existingPayment = await tx.select({ id: payments.id }).from(payments).where(eq2(payments.contractId, contractId)).limit(1);
        const paymentPayload = buildPaymentPayloadFromContract(updatedContract);
        if (existingPayment.length > 0) {
          await tx.update(payments).set(paymentPayload).where(eq2(payments.contractId, contractId));
        } else {
          await tx.insert(payments).values(paymentPayload);
        }
        return updatedContract;
      });
      if (!contract) {
        return res.status(404).json({ error: "Contract not found" });
      }
      await upsertAutoDepositConfirmationFromContract(
        contract,
        String(req.session.userId || "system")
      );
      const changedFields = Object.keys(parsed.data || {});
      await writeSystemLog(req, {
        actionType: "contract_update",
        action: `\uACC4\uC57D \uC218\uC815: ${contract.contractNumber || contractId}`,
        details: `contractId=${contractId}, fields=${changedFields.join(",") || "-"}`
      });
      res.json(contract);
    } catch (error) {
      console.error("Error updating contract:", error);
      res.status(500).json({ error: "Failed to update contract" });
    }
  });
  app2.delete("/api/contracts/:id", async (req, res) => {
    try {
      const contractId = toSingleString(req.params.id);
      const contract = await storage.getContract(contractId);
      if (!contract) {
        return res.status(404).json({ error: "Contract not found" });
      }
      if (contract.contractType === CONTRACT_TYPE_REFUND) {
        return res.status(409).json({ error: "\uD658\uBD88 \uACC4\uC57D\uC740 \uD658\uBD88\uAD00\uB9AC\uC758 \uCCA0\uD68C \uBC84\uD2BC\uC73C\uB85C\uB9CC \uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      const [refundContracts, refundRows, depositMatched] = await Promise.all([
        storage.getRefundContractsBySource(contractId),
        storage.getRefundsByContract(contractId),
        hasContractDepositMatch(contractId)
      ]);
      const paymentConfirmed = contract.paymentConfirmed === true || normalizeContractPaymentMethod(contract.paymentMethod) === PAYMENT_METHOD_DEPOSIT_CONFIRMED;
      if (refundContracts.length > 0 || refundRows.length > 0) {
        return res.status(409).json({ error: "\uD658\uBD88 \uB0B4\uC5ED\uC774 \uB9E4\uCE6D\uB41C \uACC4\uC57D\uC740 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uD658\uBD88\uAD00\uB9AC\uC5D0\uC11C \uBA3C\uC800 \uCCA0\uD68C\uD574\uC8FC\uC138\uC694." });
      }
      if (depositMatched || paymentConfirmed) {
        return res.status(409).json({ error: "\uC785\uAE08\uC644\uB8CC \uB610\uB294 \uC785\uAE08 \uB9E4\uCE6D\uB41C \uACC4\uC57D\uC740 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      await storage.deleteContract(contractId);
      await writeEntityAuditLog(
        req,
        "contract",
        "delete",
        contract.contractNumber || contractId,
        `contractId=${contractId}, customerId=${contract.customerId || "-"}, products=${contract.products || "-"}`
      );
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contract:", error);
      res.status(500).json({ error: "Failed to delete contract" });
    }
  });
  app2.get("/api/contracts-with-financials", async (req, res) => {
    try {
      const currentUser = req.session.userId ? await storage.getUser(req.session.userId) : null;
      if (isCounselorPosition(currentUser?.role)) {
        return res.json([]);
      }
      const data = await storage.getContractsWithFinancials();
      res.json(data.map((contract) => sanitizeFinancialContractRow(contract, currentUser?.role)));
    } catch (error) {
      console.error("Error fetching contracts with financials:", error);
      res.status(500).json({ error: "Failed to fetch contracts with financials" });
    }
  });
  app2.get("/api/refunds", async (_req, res) => {
    try {
      const allRefunds = await storage.getAllRefunds();
      res.json(allRefunds);
    } catch (error) {
      if (isMissingPiiEncryptionKeyError(error)) {
        console.warn("Refund reference data skipped because PII_ENCRYPTION_KEY is not configured.");
        return res.json([]);
      }
      console.error("Error fetching all refunds:", error);
      res.status(500).json({ error: "Failed to fetch refunds" });
    }
  });
  app2.put("/api/refunds/bulk/status", async (req, res) => {
    try {
      const ids = Array.isArray(req.body?.ids) ? req.body.ids.map((value) => toSingleString(typeof value === "string" ? value : String(value ?? "")).trim()).filter(Boolean) : [];
      const refundStatus = normalizeRefundStatus(req.body?.refundStatus);
      if (ids.length === 0) {
        return res.status(400).json({ error: "Refund ids are required." });
      }
      if (!refundStatus) {
        return res.status(400).json({ error: "Refund status is required." });
      }
      const updatedCount = await storage.updateRefundStatuses(ids, refundStatus);
      res.json({
        success: true,
        updatedCount,
        refundStatus
      });
    } catch (error) {
      console.error("Error updating refund statuses:", error);
      res.status(500).json({ error: "Failed to update refund statuses" });
    }
  });
  app2.get("/api/refunds/:contractId", async (req, res) => {
    try {
      const itemId = toSingleString(req.query.itemId).trim();
      const refundList = await storage.getRefundsByContract(req.params.contractId, itemId || void 0);
      res.json(refundList);
    } catch (error) {
      if (isMissingPiiEncryptionKeyError(error)) {
        console.warn("Contract refund reference data skipped because PII_ENCRYPTION_KEY is not configured.");
        return res.json([]);
      }
      console.error("Error fetching refunds:", error);
      res.status(500).json({ error: "Failed to fetch refunds" });
    }
  });
  app2.post("/api/refunds", async (req, res) => {
    try {
      const body = { ...req.body };
      if (typeof body.refundDate === "string") {
        body.refundDate = new Date(body.refundDate);
      }
      body.amount = toWholeAmount(body.amount);
      body.targetAmount = toWholeAmount(body.targetAmount);
      const parsed = insertRefundSchema.parse({
        ...body,
        refundStatus: normalizeRefundStatus(body.refundStatus) ?? REFUND_STATUS_PENDING
      });
      if (parsed.amount <= 0) {
        return res.status(400).json({ error: "Refund amount must be greater than zero." });
      }
      const contract = await storage.getContract(parsed.contractId);
      if (!contract) {
        return res.status(404).json({ error: "Contract not found." });
      }
      const targetAmount = Math.max(0, Number(parsed.targetAmount) || 0);
      const effectiveTargetAmount = targetAmount > 0 ? targetAmount : Math.max(0, Number(contract.cost) || 0);
      if (parsed.amount > effectiveTargetAmount) {
        return res.status(400).json({ error: "Refund amount cannot exceed selected row amount." });
      }
      const existingRefunds = await storage.getRefundsByContract(parsed.contractId, parsed.itemId || void 0);
      const totalRefunded = existingRefunds.reduce((sum, r) => sum + r.amount, 0);
      const remainingCost = effectiveTargetAmount - totalRefunded;
      if (parsed.amount > remainingCost) {
        return res.status(400).json({ error: "Refund amount cannot exceed remaining selected row amount." });
      }
      const previousPaymentMethod = await resolvePreviousFinancialBasePaymentMethod(parsed.contractId, contract);
      const refund = await storage.createRefund({
        ...parsed,
        previousPaymentMethod,
        refundStatus: normalizeRefundStatus(parsed.refundStatus) ?? REFUND_STATUS_PENDING
      });
      await syncFinancialPaymentMethod(parsed.contractId);
      res.status(201).json(refund);
    } catch (error) {
      console.error("Error creating refund:", error);
      res.status(500).json({ error: "Failed to create refund" });
    }
  });
  app2.delete("/api/refunds/:id", async (req, res) => {
    try {
      const refundId = toSingleString(req.params.id);
      const refund = await storage.getRefund(refundId);
      if (!refund) {
        return res.status(404).json({ error: "Refund not found" });
      }
      const matchedToDeposit = await hasDepositRefundMatch(refundId);
      await storage.deleteRefund(refundId);
      const paymentMethod = matchedToDeposit ? PAYMENT_METHOD_DEPOSIT_CONFIRMED : await syncFinancialPaymentMethod(refund.contractId, {
        deletedPreviousPaymentMethod: refund.previousPaymentMethod
      });
      if (matchedToDeposit) {
        await Promise.all([
          storage.updateContract(refund.contractId, { paymentMethod }),
          storage.updatePaymentByContractId(refund.contractId, { paymentMethod })
        ]);
      }
      res.json({
        success: true,
        id: refundId,
        contractId: refund.contractId,
        paymentMethod
      });
    } catch (error) {
      console.error("Error deleting refund:", error);
      res.status(500).json({ error: "Failed to delete refund" });
    }
  });
  app2.post("/api/refund-contracts/:id/withdraw", async (req, res) => {
    try {
      const refundContractId = toSingleString(req.params.id);
      const refundContract = await storage.getContract(refundContractId);
      if (!refundContract) {
        return res.status(404).json({ error: "Refund contract not found" });
      }
      if (refundContract.contractType !== CONTRACT_TYPE_REFUND) {
        return res.status(400).json({ error: "Only refund contracts can be withdrawn." });
      }
      const depositMatched = await hasContractDepositMatch(refundContractId);
      const paymentConfirmed = refundContract.paymentConfirmed === true || normalizeContractPaymentMethod(refundContract.paymentMethod) === PAYMENT_METHOD_DEPOSIT_CONFIRMED;
      if (depositMatched || paymentConfirmed) {
        return res.status(409).json({ error: "\uC785\uAE08\uC644\uB8CC \uB610\uB294 \uC785\uAE08 \uB9E4\uCE6D\uB41C \uD658\uBD88 \uB0B4\uC5ED\uC740 \uCCA0\uD68C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      await storage.deleteContract(refundContractId);
      await writeSystemLog(req, {
        actionType: "contract_delete",
        action: `\uD658\uBD88 \uCCA0\uD68C: ${refundContract.contractNumber || refundContractId}`,
        details: `refundContractId=${refundContractId}, sourceContractId=${refundContract.sourceContractId || "-"}`
      });
      res.json({
        success: true,
        id: refundContractId,
        sourceContractId: refundContract.sourceContractId || null
      });
    } catch (error) {
      console.error("Error withdrawing refund contract:", error);
      res.status(500).json({ error: "Failed to withdraw refund contract" });
    }
  });
  app2.get("/api/permissions", async (_req, res) => {
    try {
      const permissions = await storage.getPagePermissions();
      res.json(permissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      res.status(500).json({ error: "Failed to fetch permissions" });
    }
  });
  app2.get("/api/permissions/:userId", async (req, res) => {
    try {
      const permissions = await storage.getPagePermissionsByUser(req.params.userId);
      res.json(permissions);
    } catch (error) {
      console.error("Error fetching user permissions:", error);
      res.status(500).json({ error: "Failed to fetch user permissions" });
    }
  });
  const setPermissionsSchema = z.object({
    pageKeys: z.array(z.string())
  });
  app2.put("/api/permissions/:userId", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
      }
      const currentUser = await storage.getUser(req.session.userId);
      if (!await hasPermissionSettingsAccess(currentUser)) {
        return res.status(403).json({ error: "\uAD8C\uD55C \uC124\uC815\uC740 \uB300\uD45C, \uC774\uC0AC, \uAC1C\uBC1C\uC790 \uB610\uB294 \uAD8C\uD55C\uC124\uC815 \uAD8C\uD55C\uC774 \uC788\uB294 \uC0AC\uC6A9\uC790\uB9CC \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      const parsed = setPermissionsSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid permissions data", details: parsed.error });
      }
      await storage.setPagePermissions(req.params.userId, filterAssignablePageKeys(parsed.data.pageKeys));
      res.json({ success: true });
    } catch (error) {
      console.error("Error setting permissions:", error);
      res.status(500).json({ error: "Failed to set permissions" });
    }
  });
  app2.post("/api/permissions/apply-department-defaults/:userId", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
      }
      const currentUser = await storage.getUser(req.session.userId);
      if (!await hasPermissionSettingsAccess(currentUser)) {
        return res.status(403).json({ error: "\uAD8C\uD55C \uC124\uC815\uC740 \uB300\uD45C, \uC774\uC0AC, \uAC1C\uBC1C\uC790 \uB610\uB294 \uAD8C\uD55C\uC124\uC815 \uAD8C\uD55C\uC774 \uC788\uB294 \uC0AC\uC6A9\uC790\uB9CC \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
      }
      const targetUser = await storage.getUser(req.params.userId);
      if (!targetUser) {
        return res.status(404).json({ error: "\uC0AC\uC6A9\uC790\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const role = targetUser.role;
      if (role && positionDefaultPages[role]) {
        const appliedPages = filterAssignablePageKeys(positionDefaultPages[role]);
        await storage.setPagePermissions(targetUser.id, appliedPages);
        res.json({ success: true, appliedPages });
      } else {
        res.status(400).json({ error: "\uD574\uB2F9 \uC9C1\uCC45\uC758 \uAE30\uBCF8 \uAD8C\uD55C\uC774 \uC124\uC815\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
      }
    } catch (error) {
      console.error("Error applying department defaults:", error);
      res.status(500).json({ error: "Failed to apply department defaults" });
    }
  });
  app2.get("/api/department-default-pages", async (_req, res) => {
    res.json(departmentDefaultPages);
  });
  app2.get("/api/deposits", autoLoginDev, requireAuth, async (_req, res) => {
    try {
      res.set({
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      });
      const allDeposits = await storage.getDeposits();
      res.json(allDeposits);
    } catch (error) {
      console.error("Error fetching deposits:", error);
      res.status(500).json({ error: "Failed to fetch deposits" });
    }
  });
  app2.post("/api/deposits", autoLoginDev, requireAuth, requireDepositActionAllowed, async (req, res) => {
    try {
      const body = { ...req.body };
      if (typeof body.depositDate === "string") {
        body.depositDate = new Date(body.depositDate);
      }
      const parsed = insertDepositSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid deposit data", details: parsed.error });
      }
      const created = await storage.createDeposit(parsed.data);
      await unmarkContractDepositDeleted(created.contractId);
      res.json(created);
    } catch (error) {
      console.error("Error creating deposit:", error);
      res.status(500).json({ error: "Failed to create deposit" });
    }
  });
  const upload = multer({ storage: multer.memoryStorage() });
  const normalizeDepositUploadKey = (value) => String(value ?? "").replace(/\uFEFF/g, "").replace(/\s+/g, "").trim().toLowerCase();
  const getDepositUploadValue = (row, aliases) => {
    const normalizedEntries = /* @__PURE__ */ new Map();
    Object.entries(row || {}).forEach(([key, value]) => {
      normalizedEntries.set(normalizeDepositUploadKey(key), value);
    });
    for (const alias of aliases) {
      const value = normalizedEntries.get(normalizeDepositUploadKey(alias));
      if (value === void 0 || value === null) continue;
      if (typeof value === "string" && value.trim() === "") continue;
      return value;
    }
    return void 0;
  };
  const parseDepositUploadDate = (rawValue) => {
    if (typeof rawValue === "number") {
      const excelEpochUtc = Date.UTC(1899, 11, 30);
      const millis = Math.round(rawValue * 24 * 60 * 60 * 1e3);
      const parsed2 = new Date(excelEpochUtc + millis);
      if (!Number.isNaN(parsed2.getTime())) return parsed2;
    }
    if (rawValue instanceof Date && !Number.isNaN(rawValue.getTime())) {
      return rawValue;
    }
    const rawText = String(rawValue ?? "").trim();
    if (!rawText) return /* @__PURE__ */ new Date();
    const normalizedText = rawText.replace(/[./]/g, "-");
    const parsed = new Date(normalizedText);
    if (!Number.isNaN(parsed.getTime())) return parsed;
    return /* @__PURE__ */ new Date();
  };
  app2.post("/api/deposits/upload", autoLoginDev, requireAuth, requireDepositActionAllowed, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      const depositsToCreate = rows.map((row) => {
        const rawDate = getDepositUploadValue(row, [
          "\uC785\uAE08\uC77C\uC790",
          "\uC785\uAE08\uC77C",
          "\uB0A0\uC9DC",
          "\uC77C\uC790",
          "date",
          "depositDate"
        ]);
        const rawDepositorName = getDepositUploadValue(row, [
          "\uC785\uAE08\uC790\uBA85",
          "\uC785\uAE08\uC790",
          "\uC608\uAE08\uC8FC",
          "\uC774\uB984",
          "\uACE0\uAC1D\uBA85",
          "depositor",
          "depositorName"
        ]);
        const rawDepositAmount = getDepositUploadValue(row, [
          "\uC785\uAE08\uAE08\uC561",
          "\uC785\uAE08\uC561",
          "\uAE08\uC561",
          "amount",
          "depositAmount"
        ]);
        const rawDepositBank = getDepositUploadValue(row, [
          "\uC785\uAE08\uC740\uD589",
          "\uC740\uD589",
          "bank",
          "depositBank"
        ]);
        const rawNotes = getDepositUploadValue(row, ["\uBE44\uACE0", "\uBA54\uBAA8", "notes", "note"]);
        const depositorName = String(rawDepositorName ?? "").trim();
        const depositAmount = Number(String(rawDepositAmount ?? "0").replace(/[,원\s]/g, "")) || 0;
        if (!depositorName && depositAmount <= 0) {
          return null;
        }
        return {
          depositDate: parseDepositUploadDate(rawDate),
          depositorName,
          depositAmount,
          depositBank: String(rawDepositBank ?? "").trim() || "\uD558\uB098",
          notes: String(rawNotes ?? "").trim() || null,
          confirmedAmount: 0,
          contractId: null,
          confirmedBy: null,
          confirmedAt: null
        };
      }).filter((deposit) => Boolean(deposit?.depositorName));
      if (depositsToCreate.length === 0) {
        return res.status(400).json({
          error: "\uC5C5\uB85C\uB4DC \uAC00\uB2A5\uD55C \uC785\uAE08 \uD589\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC785\uAE08\uC790\uBA85/\uC785\uAE08\uAE08\uC561 \uC5F4 \uC774\uB984\uC744 \uD655\uC778\uD574\uC8FC\uC138\uC694."
        });
      }
      const created = [];
      for (const depositToCreate of depositsToCreate) {
        const createdDeposit = await storage.createDeposit(depositToCreate);
        created.push(createdDeposit);
      }
      await writeSystemLog(req, {
        actionType: "excel_upload",
        action: "\uC785\uAE08\uC644\uB8CC \uC5D1\uC140 \uC5C5\uB85C\uB4DC",
        details: `file=${req.file.originalname}, rows=${rows.length}, imported=${created.length}`
      });
      res.json({ count: created.length, deposits: created });
    } catch (error) {
      console.error("Error uploading deposits:", error);
      res.status(500).json({ error: "\uC785\uAE08 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.put("/api/deposits/:id", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const { contractIds, refundIds, confirmedAmount, depositDate, depositorName, depositAmount, depositBank, notes } = req.body;
      const isDetailEditRequest = depositDate !== void 0 || depositorName !== void 0 || depositAmount !== void 0 || depositBank !== void 0 || notes !== void 0;
      if (isDetailEditRequest) {
        const currentUser = await storage.getUser(req.session.userId);
        const userDepartment = String(currentUser?.department || "").trim();
        const userRole = String(currentUser?.role || "").trim();
        const canManageDeposits = DEPOSIT_ACTION_ALLOWED_DEPARTMENTS.has(userDepartment) || PERMISSION_ADMIN_ROLES.includes(userRole);
        if (!canManageDeposits) {
          return res.status(403).json({ error: "\uC785\uAE08\uC644\uB8CC \uB4F1\uB85D, \uC5D1\uC140 \uC5C5\uB85C\uB4DC, \uC218\uC815, \uC0AD\uC81C\uB294 \uACBD\uC601\uC9C0\uC6D0\uD300 \uB610\uB294 \uB300\uD45C\uC774\uC0AC/\uCD1D\uAD04\uC774\uC0AC/\uAC1C\uBC1C\uC790\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4." });
        }
        const updateData = {};
        if (depositDate !== void 0) {
          const parsedDate = new Date(depositDate);
          if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uB0A0\uC9DC \uD615\uC2DD\uC785\uB2C8\uB2E4." });
          }
          updateData.depositDate = parsedDate;
        }
        if (depositorName !== void 0) {
          if (typeof depositorName !== "string" || !depositorName.trim()) {
            return res.status(400).json({ error: "\uC785\uAE08\uC790\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." });
          }
          updateData.depositorName = depositorName.trim();
        }
        if (depositAmount !== void 0) {
          const parsedAmount = Number(depositAmount);
          if (isNaN(parsedAmount) || parsedAmount < 0) {
            return res.status(400).json({ error: "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uAE08\uC561\uC785\uB2C8\uB2E4." });
          }
          updateData.depositAmount = parsedAmount;
        }
        if (depositBank !== void 0) {
          updateData.depositBank = depositBank;
        }
        if (notes !== void 0) {
          updateData.notes = notes;
        }
        const updated2 = await storage.updateDeposit(req.params.id, updateData);
        if (!updated2) {
          return res.status(404).json({ error: "Deposit not found" });
        }
        await unmarkContractDepositDeleted(updated2.contractId);
        if (!contractIds && !refundIds && !req.body.contractId) {
          return res.json(updated2);
        }
      }
      const depositId = req.params.id;
      const normalizedContractIds = Array.isArray(contractIds) ? Array.from(new Set(contractIds.map((id) => String(id || "").trim()).filter(Boolean))) : req.body.contractId ? [String(req.body.contractId).trim()].filter(Boolean) : [];
      const normalizedRefundIds = Array.isArray(refundIds) ? Array.from(new Set(refundIds.map((id) => String(id || "").trim()).filter(Boolean))) : [];
      const previousMatchedRefundIds = await getDepositRefundMatchIds(depositId);
      if (previousMatchedRefundIds.length > 0) {
        await storage.updateRefundStatuses(previousMatchedRefundIds, REFUND_STATUS_PENDING);
      }
      let totalContractCost = 0;
      for (const contractId of normalizedContractIds) {
        const contract = await storage.getContract(contractId);
        if (!contract) continue;
        totalContractCost += getDepositMatchContractAmount(contract);
      }
      const selectedRefundRows = (await Promise.all(normalizedRefundIds.map((refundId) => storage.getRefund(refundId)))).filter((refund) => {
        if (!refund) return false;
        const normalizedStatus = normalizeRefundStatus(refund.refundStatus);
        return normalizedStatus === REFUND_STATUS_PENDING || previousMatchedRefundIds.includes(refund.id);
      });
      const refundContracts = await Promise.all(
        selectedRefundRows.map((refund) => storage.getContract(refund.contractId))
      );
      const totalRefundOffsetAmount = selectedRefundRows.reduce((sum, refund, index) => {
        return sum + getDepositMatchRefundAmountWithVat(refundContracts[index], refund);
      }, 0);
      const netMatchedAmount = Math.max(totalContractCost - totalRefundOffsetAmount, 0);
      const depositCoversAll = (Number(confirmedAmount) || 0) >= netMatchedAmount;
      for (const contractId of normalizedContractIds) {
        await storage.updateContract(contractId, {
          paymentMethod: PAYMENT_METHOD_DEPOSIT_CONFIRMED,
          paymentConfirmed: depositCoversAll
        });
      }
      if (selectedRefundRows.length > 0) {
        await storage.updateRefundStatuses(
          selectedRefundRows.map((refund) => refund.id),
          REFUND_STATUS_OFFSET
        );
      }
      await replaceDepositRefundMatches(
        depositId,
        selectedRefundRows.map((refund) => refund.id)
      );
      const firstContractId = normalizedContractIds[0] || selectedRefundRows[0]?.contractId || null;
      const updated = await storage.updateDeposit(depositId, {
        confirmedAmount: confirmedAmount || 0,
        totalContractAmount: netMatchedAmount,
        contractId: firstContractId,
        confirmedAt: /* @__PURE__ */ new Date(),
        confirmedBy: req.session.userId || "system"
      });
      if (!updated) {
        return res.status(404).json({ error: "Deposit not found" });
      }
      await unmarkContractDepositDeleted(firstContractId);
      res.json(updated);
    } catch (error) {
      console.error("Error updating deposit:", error);
      res.status(500).json({ error: "Failed to update deposit" });
    }
  });
  app2.delete("/api/deposits/:id", autoLoginDev, requireAuth, requireDepositActionAllowed, async (req, res) => {
    try {
      const depositId = req.params.id;
      const existing = await storage.getDeposit(depositId);
      const matchedRefundIds = await getDepositRefundMatchIds(depositId);
      if (matchedRefundIds.length > 0) {
        await storage.updateRefundStatuses(matchedRefundIds, REFUND_STATUS_PENDING);
        await clearDepositRefundMatches(depositId);
      }
      await markContractDepositDeleted(existing?.contractId);
      if (existing?.contractId) {
        await storage.updateContract(existing.contractId, {
          paymentMethod: "\uC785\uAE08\uC608\uC815",
          paymentConfirmed: false,
          depositBank: null
        });
      }
      await storage.deleteDeposit(depositId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting deposit:", error);
      res.status(500).json({ error: "Failed to delete deposit" });
    }
  });
  app2.post("/api/deposits/bulk-delete", autoLoginDev, requireAuth, requireDepositActionAllowed, async (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "\uC0AD\uC81C\uD560 \uD56D\uBAA9\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694." });
      }
      const deletedIds = [];
      for (const id of ids) {
        const existing = await storage.getDeposit(id);
        if (!existing) continue;
        const matchedRefundIds = await getDepositRefundMatchIds(id);
        if (matchedRefundIds.length > 0) {
          await storage.updateRefundStatuses(matchedRefundIds, REFUND_STATUS_PENDING);
          await clearDepositRefundMatches(id);
        }
        await markContractDepositDeleted(existing.contractId);
        if (existing.contractId) {
          await storage.updateContract(existing.contractId, {
            paymentMethod: "\uC785\uAE08\uC608\uC815",
            paymentConfirmed: false,
            depositBank: null
          });
        }
        await storage.deleteDeposit(id);
        deletedIds.push(id);
      }
      res.json({ success: true, deletedCount: deletedIds.length, deletedIds });
    } catch (error) {
      console.error("Error bulk deleting deposits:", error);
      res.status(500).json({ error: "\uC77C\uAD04 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.get("/api/deposits/contracts-by-department", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) return res.status(401).json({ error: "User not found" });
      const allContracts = await storage.getContracts();
      const matchableContracts = allContracts.filter((contract) => isMatchableDepositContract(contract));
      res.json(matchableContracts);
    } catch (error) {
      console.error("Error fetching contracts by department:", error);
      res.status(500).json({ error: "Failed to fetch contracts" });
    }
  });
  app2.get("/api/sales-analytics", autoLoginDev, requireAuth, async (req, res) => {
    try {
      const { startDate, endDate, managerName: managerNameFilter, customerName: customerNameFilter, productFilter, departmentFilter } = req.query;
      const contracts2 = await storage.getContractsWithFinancials();
      const users2 = await storage.getUsers();
      const products2 = await storage.getProducts();
      const customers2 = await storage.getCustomers();
      const allRefunds = await storage.getAllRefunds();
      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }
      const isExecutive = PERMISSION_ADMIN_ROLES.includes(currentUser.role || "");
      const isManager = isManagerPosition(currentUser.role);
      const managerNameValue = normalizeText(toSingleString(managerNameFilter));
      const customerNameValue = normalizeText(toSingleString(customerNameFilter));
      const productFilterValue = normalizeText(toSingleString(productFilter));
      const departmentFilterValue = normalizeText(toSingleString(departmentFilter));
      const normalizeProductKey = (value) => normalizeText(value).replace(/\s+/g, "");
      const getBaseProductName = (value) => normalizeText(value).replace(/\s*\([^)]*\)\s*$/, "").trim();
      const getBaseProductKey = (value) => normalizeProductKey(getBaseProductName(value));
      const productByName = new Map(
        products2.map((product) => [normalizeText(product.name), product]).filter(([name]) => !!name)
      );
      const productByBaseName = new Map(
        products2.map((product) => [getBaseProductKey(product.name), product]).filter(([name]) => !!name)
      );
      const regionalProductNameSet = new Set(
        products2.filter((product) => isRegionalKeyword(product.category) || isRegionalKeyword(product.name)).map((product) => normalizeText(product.name)).filter(Boolean)
      );
      const productById = new Map(
        products2.map((product) => [String(product.id), product])
      );
      const customersById = new Map(
        customers2.map((customer) => [String(customer.id), customer])
      );
      const contractsByCustomerId = /* @__PURE__ */ new Map();
      contracts2.forEach((contract) => {
        const customerId = normalizeText(contract.customerId);
        if (!customerId) return;
        const existing = contractsByCustomerId.get(customerId) || [];
        existing.push(contract);
        contractsByCustomerId.set(customerId, existing);
      });
      const regionalProductNameSetEnhanced = /* @__PURE__ */ new Set([
        ...Array.from(regionalProductNameSet),
        ...products2.filter((product) => isRegionalKeyword(product.category) || isRegionalKeyword(product.name)).map((product) => normalizeText(product.name)).filter(Boolean)
      ]);
      const regionalProductIdSet = new Set(
        products2.filter((product) => isRegionalKeyword(product.category) || isRegionalKeyword(product.name)).map((product) => String(product.id))
      );
      const parseContractProductNames = (value) => String(value || "").split(",").map((name) => normalizeText(name)).filter(Boolean);
      const parseAnalyticsProductDetails = (rawValue) => {
        if (typeof rawValue !== "string" || !rawValue.trim()) return [];
        try {
          const parsed = JSON.parse(rawValue);
          if (!Array.isArray(parsed)) return [];
          return parsed.filter((item) => !!item && typeof item === "object").map((item) => ({
            productName: normalizeText(item.productName),
            days: Math.max(Number(item.days) || 0, 0),
            addQuantity: Math.max(Number(item.addQuantity) || 0, 0),
            extendQuantity: Math.max(Number(item.extendQuantity) || 0, 0)
          })).filter((item) => !!item.productName);
        } catch {
          return [];
        }
      };
      const getContractAnalyticsProductNames = (contract) => {
        const detailProductNames = parseAnalyticsProductDetails(contract.productDetailsJson).map((item) => item.productName).filter(Boolean);
        return Array.from(/* @__PURE__ */ new Set([...detailProductNames, ...parseContractProductNames(contract.products)]));
      };
      const hasSlotContractNumberHint = (contract) => {
        const contractNumber = normalizeText(contract.contractNumber).toUpperCase();
        return contractNumber.includes("SLOT") || contractNumber.includes("SLT");
      };
      const hasViralContractNumberHint = (contract) => {
        const contractNumber = normalizeText(contract.contractNumber).toUpperCase();
        return contractNumber.includes("VIRAL");
      };
      const contractHasRegionalProduct = (contract) => {
        const productNames = parseContractProductNames(contract.products);
        return productNames.some((name) => {
          if (regionalProductNameSetEnhanced.has(name)) return true;
          if (isRegionalKeyword(name)) return true;
          const matched = productByName.get(name);
          return !!matched && (isRegionalKeyword(matched.category) || isRegionalKeyword(matched.name));
        });
      };
      const contractMatchesProductFilter = (contract, targetProductName) => {
        const normalizedTarget = normalizeText(targetProductName);
        if (!normalizedTarget) return false;
        return parseContractProductNames(contract.products).includes(normalizedTarget);
      };
      const usersById = new Map(users2.map((user) => [String(user.id), user]));
      const usersByName = new Map(
        users2.map((user) => [normalizeText(user.name), user]).filter(([name]) => !!name)
      );
      const resolveContractDepartment = (contract) => {
        return contractHasRegionalProduct(contract) ? REGIONAL_DEPARTMENT : MARKETING_DEPARTMENT;
      };
      const resolveDealDepartment = (deal) => {
        const product = productById.get(String(deal.productId || ""));
        if (product && (regionalProductIdSet.has(String(product.id)) || isRegionalKeyword(product.category) || isRegionalKeyword(product.name))) {
          return REGIONAL_DEPARTMENT;
        }
        if (isRegionalKeyword(deal.productName)) return REGIONAL_DEPARTMENT;
        const normalizedDealStatus = normalizeRegionalDealContractStatus(deal.contractStatus);
        const hasRegionalBusinessKey = !!normalizeText(deal.billingAccountNumber) || !!normalizeText(deal.companyName);
        const hasRegionalLineData = Math.max(Number(deal.lineCount) || 0, 0) > 0 || Math.max(Number(deal.cancelledLineCount) || 0, 0) > 0;
        if ((normalizedDealStatus === "\uC778\uC785" || normalizedDealStatus === "\uAC1C\uD1B5" || normalizedDealStatus === "\uD574\uC9C0") && (hasRegionalBusinessKey || hasRegionalLineData)) {
          return REGIONAL_DEPARTMENT;
        }
        if (deal.customerId) {
          const matchedContract = contracts2.find((contract) => contract.customerId === deal.customerId);
          if (matchedContract) return resolveContractDepartment(matchedContract);
        }
        return MARKETING_DEPARTMENT;
      };
      const hasTeamUsers = users2.some((user) => {
        const dept = normalizeText(user.department);
        return dept === REGIONAL_DEPARTMENT || dept === MARKETING_DEPARTMENT;
      });
      const hasManagerMapping = contracts2.some(
        (contract) => users2.some(
          (user) => contract.managerId && String(user.id) === String(contract.managerId) || normalizeText(user.name) === normalizeText(contract.managerName)
        )
      );
      const canApplyDepartmentSplit = regionalProductIdSet.size > 0 || hasTeamUsers && hasManagerMapping;
      let filtered = contracts2;
      if (isManager) {
        filtered = filtered.filter((contract) => isOwnManagedRecord(currentUser, contract));
      } else if (!isExecutive) {
        const userDepartment = normalizeText(currentUser.department);
        if (canApplyDepartmentSplit && (userDepartment === REGIONAL_DEPARTMENT || userDepartment === MARKETING_DEPARTMENT)) {
          filtered = filtered.filter((contract) => resolveContractDepartment(contract) === userDepartment);
        } else if (userDepartment && userDepartment !== REGIONAL_DEPARTMENT && userDepartment !== MARKETING_DEPARTMENT) {
          const sameTeamUsers = users2.filter((user) => normalizeText(user.department) === userDepartment);
          const sameTeamIds = new Set(sameTeamUsers.map((user) => String(user.id)));
          const sameTeamNames = new Set(sameTeamUsers.map((user) => normalizeText(user.name)).filter(Boolean));
          filtered = filtered.filter(
            (contract) => contract.managerId && sameTeamIds.has(String(contract.managerId)) || normalizeText(contract.managerName) && sameTeamNames.has(normalizeText(contract.managerName))
          );
        }
      }
      const accessFilteredContracts = filtered;
      const matchesContractSelectionFilters = (contract) => {
        if (managerNameValue && managerNameValue !== "all" && normalizeText(contract.managerName) !== managerNameValue) {
          return false;
        }
        if (customerNameValue && customerNameValue !== "all" && normalizeText(contract.customerName) !== customerNameValue) {
          return false;
        }
        if (productFilterValue && productFilterValue !== "all" && !contractMatchesProductFilter(contract, productFilterValue)) {
          return false;
        }
        if (canApplyDepartmentSplit && departmentFilterValue && departmentFilterValue !== "all") {
          const contractDepartment = resolveContractDepartment(contract);
          if (departmentFilterValue === REGIONAL_DEPARTMENT || departmentFilterValue === MARKETING_DEPARTMENT) {
            return contractDepartment === departmentFilterValue;
          }
          return normalizeText(contractDepartment) === departmentFilterValue;
        }
        return true;
      };
      const filteredWithoutDate = accessFilteredContracts.filter(matchesContractSelectionFilters);
      filtered = filteredWithoutDate;
      const startDateValue = toSingleString(startDate);
      const endDateValue = toSingleString(endDate);
      if (startDateValue || endDateValue) {
        filtered = filtered.filter(
          (c) => isWithinKoreanDateRange(c.contractDate, startDateValue || void 0, endDateValue || void 0)
        );
      }
      const refundMatchesSelectionFilters = (refund, options) => {
        if (!options?.ignoreDate && !isWithinKoreanDateRange(refund.refundDate, startDateValue || void 0, endDateValue || void 0)) {
          return false;
        }
        if (managerNameValue && managerNameValue !== "all" && normalizeText(refund.managerName) !== managerNameValue) {
          return false;
        }
        if (isManager && normalizeText(refund.managerName) !== normalizeText(currentUser.name)) {
          return false;
        }
        if (customerNameValue && customerNameValue !== "all" && normalizeText(refund.customerName) !== customerNameValue) {
          return false;
        }
        const refundProductNames = [
          normalizeText(refund.productName),
          ...parseContractProductNames(refund.products)
        ].filter(Boolean);
        if (productFilterValue && productFilterValue !== "all" && !refundProductNames.some((name) => normalizeText(name) === productFilterValue)) {
          return false;
        }
        const isRegionalRefund = refundProductNames.some((name) => contractHasRegionalProduct({ products: name }));
        if (departmentFilterValue === REGIONAL_DEPARTMENT && !isRegionalRefund) return false;
        if (departmentFilterValue === MARKETING_DEPARTMENT && isRegionalRefund) return false;
        if (!isExecutive && normalizeText(currentUser.department) === REGIONAL_DEPARTMENT && !isRegionalRefund) return false;
        if (!isExecutive && normalizeText(currentUser.department) === MARKETING_DEPARTMENT && isRegionalRefund) return false;
        return true;
      };
      const filteredRefunds = allRefunds.filter((refund) => refundMatchesSelectionFilters(refund));
      const totalSales = filtered.reduce((sum, contract) => sum + getGrossSalesAmount(contract), 0);
      const totalRefunds = filteredRefunds.reduce((sum, refund) => sum + Math.max(Number(refund.amount) || 0, 0), 0);
      const netSales = totalSales - totalRefunds;
      const contractCount = filtered.length;
      const avgDealAmount = contractCount > 0 ? Math.round(totalSales / contractCount) : 0;
      const confirmedCount = filtered.filter((c) => c.paymentConfirmed).length;
      const confirmRate = contractCount > 0 ? Math.round(confirmedCount / contractCount * 1e3) / 10 : 0;
      const monthlyMap = {};
      const ensureMonthlyBucket = (key) => {
        if (!monthlyMap[key]) monthlyMap[key] = { sales: 0, refunds: 0, count: 0 };
        return monthlyMap[key];
      };
      filtered.forEach((c) => {
        const key = getKoreanYearMonthKey(c.contractDate);
        if (!key) return;
        const bucket = ensureMonthlyBucket(key);
        bucket.sales += getGrossSalesAmount(c);
        bucket.count += 1;
      });
      filteredRefunds.forEach((refund) => {
        const key = getKoreanYearMonthKey(refund.refundDate);
        if (!key) return;
        const bucket = ensureMonthlyBucket(key);
        bucket.refunds += Math.max(Number(refund.amount) || 0, 0);
      });
      const monthlyData = Object.entries(monthlyMap).sort(([a], [b]) => a.localeCompare(b)).map(([key, val]) => ({
        month: `${parseInt(key.split("-")[1], 10)}\uC6D4`,
        yearMonth: key,
        \uB9E4\uCD9C: val.sales,
        \uD658\uBD88: val.refunds,
        \uC21C\uB9E4\uCD9C: val.sales - val.refunds,
        \uAC74\uC218: val.count
      }));
      const productMap = {};
      filtered.forEach((c) => {
        const pName = c.products || "\uAE30\uD0C0";
        if (!productMap[pName]) productMap[pName] = { sales: 0, count: 0 };
        productMap[pName].sales += getGrossSalesAmount(c);
        productMap[pName].count += 1;
      });
      const colors = ["#135bec", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#818cf8", "#a78bfa"];
      const productData = Object.entries(productMap).sort(([, a], [, b]) => b.sales - a.sales).map(([name, val], i) => ({
        name,
        value: totalSales > 0 ? Math.round(val.sales / totalSales * 1e3) / 10 : 0,
        sales: val.sales,
        count: val.count,
        color: colors[i % colors.length]
      }));
      const marketingProductMap = {};
      filtered.forEach((c) => {
        const pName = c.products || "\uAE30\uD0C0";
        if (resolveContractDepartment(c) === REGIONAL_DEPARTMENT) return;
        if (!marketingProductMap[pName]) marketingProductMap[pName] = { sales: 0, count: 0 };
        marketingProductMap[pName].sales += getGrossSalesAmount(c);
        marketingProductMap[pName].count += 1;
      });
      const marketingTotalSales = Object.values(marketingProductMap).reduce((s, v) => s + v.sales, 0);
      const marketingProductData = Object.entries(marketingProductMap).sort(([, a], [, b]) => b.sales - a.sales).map(([name, val], i) => ({
        name,
        value: marketingTotalSales > 0 ? Math.round(val.sales / marketingTotalSales * 1e3) / 10 : 0,
        sales: val.sales,
        count: val.count,
        color: colors[i % colors.length]
      }));
      const normalizeCategory = (value) => String(value || "").replace(/\s+/g, "").trim();
      const resolveAnalyticsProduct = (productName) => {
        const exactMatch = productByName.get(normalizeText(productName));
        if (exactMatch) return exactMatch;
        return productByBaseName.get(getBaseProductKey(productName));
      };
      const isSlotLikeProduct = (productName) => {
        const matchedProduct = resolveAnalyticsProduct(productName);
        const normalizedCategory = normalizeCategory(matchedProduct?.category);
        const normalizedName = normalizeCategory(matchedProduct?.name || productName);
        const baseKey = normalizeText(getBaseProductKey(matchedProduct?.name || productName)).toLowerCase();
        const nameKey = normalizeText(normalizedName).toLowerCase();
        return normalizedCategory.includes("\uC2AC\uB86F") || normalizedName.includes("\uC2AC\uB86F") || SLOT_PRODUCT_ALIAS_KEYS.has(baseKey) || SLOT_PRODUCT_ALIAS_KEYS.has(nameKey);
      };
      const isViralLikeProduct = (productName) => {
        const matchedProduct = resolveAnalyticsProduct(productName);
        const normalizedCategory = normalizeCategory(matchedProduct?.category);
        const normalizedName = normalizeCategory(matchedProduct?.name || productName);
        const baseKey = normalizeText(getBaseProductKey(matchedProduct?.name || productName)).toLowerCase();
        const nameKey = normalizeText(normalizedName).toLowerCase();
        return normalizedCategory.includes("\uBC14\uC774\uB7F4") || VIRAL_PRODUCT_ALIAS_KEYS.has(baseKey) || VIRAL_PRODUCT_ALIAS_KEYS.has(nameKey);
      };
      const excludeRoles = ["\uB300\uD45C\uC774\uC0AC", "\uCD1D\uAD04\uC774\uC0AC", "\uAC1C\uBC1C\uC790"];
      const excludeDepartments = ["\uACBD\uC601\uC9C4", "\uAC1C\uBC1C\uD300", "\uC5F0\uAD6C\uAC1C\uBC1C\uD300", "\uACBD\uC601\uC9C0\uC6D0\uC2E4", "\uACBD\uC601\uC9C0\uC6D0\uD300"];
      const managerMap = {};
      const ensureManagerSummaryEntry = (managerId, managerName) => {
        const normalizedManagerId = normalizeText(managerId);
        const normalizedManagerName = normalizeText(managerName);
        const mgr = normalizedManagerId && usersById.get(normalizedManagerId) || normalizedManagerName && usersByName.get(normalizedManagerName) || users2.find((user) => user.id === managerId || user.name === managerName);
        if (mgr && (excludeRoles.includes(mgr.role || "") || excludeDepartments.includes(mgr.department || ""))) return null;
        const managerDisplayName = mgr?.name || normalizeText(managerName) || "\uBBF8\uC9C0\uC815";
        const mKey = mgr?.id ? `user:${mgr.id}` : normalizedManagerName ? `name:${normalizedManagerName}` : "name:\uBBF8\uC9C0\uC815";
        if (!managerMap[mKey]) managerMap[mKey] = { sales: 0, refunds: 0, count: 0, workCost: 0, workers: /* @__PURE__ */ new Set(), name: managerDisplayName };
        return managerMap[mKey];
      };
      filtered.forEach((c) => {
        const entry = ensureManagerSummaryEntry(c.managerId, c.managerName);
        if (!entry) return;
        entry.sales += getGrossSalesAmount(c);
        entry.count += 1;
        entry.workCost += c.workCost || 0;
        if (c.worker) {
          c.worker.split(",").map((w) => w.trim()).filter(Boolean).forEach((w) => entry.workers.add(w));
        } else if (c.products) {
          const pNames = c.products.split(",").map((n) => n.trim());
          pNames.forEach((pn) => {
            const prod = resolveAnalyticsProduct(pn);
            if (prod?.worker) entry.workers.add(prod.worker);
          });
        }
      });
      filteredRefunds.forEach((refund) => {
        const entry = ensureManagerSummaryEntry(null, refund.managerName);
        if (!entry) return;
        entry.refunds += Math.max(Number(refund.amount) || 0, 0);
      });
      const managerData = Object.entries(managerMap).sort(([, a], [, b]) => b.sales - a.sales).map(([, val]) => ({
        manager: val.name,
        \uB9E4\uCD9C: val.sales,
        \uD658\uBD88: val.refunds,
        \uAC74\uC218: val.count,
        \uC791\uC5C5\uBE44: val.workCost,
        \uC791\uC5C5\uC790: Array.from(val.workers).join(", ")
      }));
      const departmentMap = {};
      filtered.forEach((c) => {
        const dept = normalizeText(resolveContractDepartment(c)) || "\uBBF8\uC9C0\uC815";
        if (!departmentMap[dept]) departmentMap[dept] = { sales: 0, count: 0 };
        departmentMap[dept].sales += getGrossSalesAmount(c);
        departmentMap[dept].count += 1;
      });
      const departmentData = Object.entries(departmentMap).sort(([, a], [, b]) => b.sales - a.sales).map(([department, val]) => ({
        department,
        \uB9E4\uCD9C: val.sales,
        \uAC74\uC218: val.count
      }));
      const allDeals = await storage.getDeals();
      let filteredDeals = allDeals;
      if (customerNameValue && customerNameValue !== "all") {
        const matchingCustomerIds = customers2.filter((customer) => normalizeText(customer.name) === customerNameValue).map((customer) => customer.id);
        filteredDeals = filteredDeals.filter((d) => d.customerId && matchingCustomerIds.includes(d.customerId));
      }
      if (managerNameValue && managerNameValue !== "all") {
        const mgrContracts = filtered.filter((contract) => normalizeText(contract.managerName) === managerNameValue);
        const mgrCustomerIds = new Set(mgrContracts.map((c) => c.customerId).filter(Boolean));
        filteredDeals = filteredDeals.filter((d) => d.customerId && mgrCustomerIds.has(d.customerId));
      }
      if (productFilterValue && productFilterValue !== "all") {
        filteredDeals = filteredDeals.filter((deal) => {
          const product = productById.get(String(deal.productId || ""));
          return normalizeText(product?.name) === productFilterValue;
        });
      }
      if (canApplyDepartmentSplit && departmentFilterValue && departmentFilterValue !== "all") {
        filteredDeals = filteredDeals.filter((deal) => {
          const dealDepartment = resolveDealDepartment(deal);
          if (departmentFilterValue === REGIONAL_DEPARTMENT || departmentFilterValue === MARKETING_DEPARTMENT) {
            return dealDepartment === departmentFilterValue;
          }
          return normalizeText(dealDepartment) === departmentFilterValue;
        });
      }
      if (!isExecutive) {
        const userDept = normalizeText(currentUser.department);
        if (canApplyDepartmentSplit && (userDept === REGIONAL_DEPARTMENT || userDept === MARKETING_DEPARTMENT)) {
          filteredDeals = filteredDeals.filter((deal) => resolveDealDepartment(deal) === userDept);
        } else if (userDept && userDept !== REGIONAL_DEPARTMENT && userDept !== MARKETING_DEPARTMENT) {
          const sameTeamUsers2 = users2.filter((user) => normalizeText(user.department) === userDept);
          const sameTeamIds2 = new Set(sameTeamUsers2.map((user) => String(user.id)));
          const sameTeamNames2 = new Set(sameTeamUsers2.map((user) => normalizeText(user.name)).filter(Boolean));
          const teamContracts = contracts2.filter(
            (contract) => contract.managerId && sameTeamIds2.has(String(contract.managerId)) || normalizeText(contract.managerName) && sameTeamNames2.has(normalizeText(contract.managerName))
          );
          const teamCustomerIds = new Set(teamContracts.map((contract) => contract.customerId).filter(Boolean));
          filteredDeals = filteredDeals.filter((deal) => deal.customerId && teamCustomerIds.has(deal.customerId));
        }
      }
      const filteredDealsWithoutDate = filteredDeals;
      if (startDateValue || endDateValue) {
        filteredDeals = filteredDeals.filter(
          (d) => (() => {
            const customerId = normalizeText(d.customerId);
            const relatedCustomer = customerId ? customersById.get(customerId) : void 0;
            const relatedContracts = customerId ? contractsByCustomerId.get(customerId) || [] : [];
            const hasContractInRange = relatedContracts.some(
              (contract) => isWithinKoreanDateRange(contract.contractDate, startDateValue || void 0, endDateValue || void 0)
            );
            if (hasContractInRange) return true;
            if (relatedCustomer && isWithinKoreanDateRange(relatedCustomer.createdAt, startDateValue || void 0, endDateValue || void 0)) {
              return true;
            }
            return isWithinKoreanDateRange(d.createdAt, startDateValue || void 0, endDateValue || void 0);
          })()
        );
      }
      const getAnalyticsDealLines = (deal) => Math.max(Number(deal.lineCount) || 0, 0);
      const getAnalyticsDealRemainingLines = (deal) => Math.max((Number(deal.lineCount) || 0) - (Number(deal.cancelledLineCount) || 0), 0);
      const getChurnedAnalyticsDealLines = (deal) => Math.max(Number(deal.cancelledLineCount) || 0, 0);
      const getCustomerDbAlignedStatus = (deal) => {
        const normalizedContractStatus = normalizeRegionalDealContractStatus(deal.contractStatus, deal.stage);
        if (normalizedContractStatus === "\uBCC0\uACBD") return "\uBCC0\uACBD";
        if (deal.stage === "churned") return "\uD574\uC9C0";
        if (deal.stage === "active") return "\uAC1C\uD1B5";
        return "\uC778\uC785";
      };
      const isRegionalDepartmentFilter = normalizeText(departmentFilterValue) === normalizeText(REGIONAL_DEPARTMENT);
      const dealsSummarySource = isRegionalDepartmentFilter ? filteredDealsWithoutDate : filteredDeals;
      const totalLineCount = dealsSummarySource.reduce((sum, d) => sum + getAnalyticsDealLines(d), 0);
      const inboundDealsForSummary = dealsSummarySource.filter((d) => getCustomerDbAlignedStatus(d) === "\uC778\uC785");
      const openedDealsForSummary = dealsSummarySource.filter((d) => getCustomerDbAlignedStatus(d) === "\uAC1C\uD1B5");
      const changedDealsForSummary = dealsSummarySource.filter((d) => getCustomerDbAlignedStatus(d) === "\uBCC0\uACBD");
      const churnedDealsForSummary = dealsSummarySource.filter((d) => getChurnedAnalyticsDealLines(d) > 0);
      const newDeals = inboundDealsForSummary.length;
      const activeDeals = openedDealsForSummary.length;
      const changedDeals = changedDealsForSummary.length;
      const churnedDeals = churnedDealsForSummary.length;
      const newLines = inboundDealsForSummary.reduce((sum, d) => sum + getAnalyticsDealLines(d), 0);
      const activeLines = openedDealsForSummary.reduce((sum, d) => sum + getAnalyticsDealLines(d), 0);
      const changedLines = changedDealsForSummary.reduce((sum, d) => sum + getAnalyticsDealLines(d), 0);
      const churnedLines = dealsSummarySource.reduce((sum, d) => sum + getChurnedAnalyticsDealLines(d), 0);
      const regionalSummarySourceDeals = filteredDealsWithoutDate.filter(
        (deal) => resolveDealDepartment(deal) === REGIONAL_DEPARTMENT
      );
      const regionalInboundDealsForSummary = regionalSummarySourceDeals.filter(
        (deal) => getCustomerDbAlignedStatus(deal) === "\uC778\uC785"
      );
      const regionalOpenedDealsForSummary = regionalSummarySourceDeals.filter(
        (deal) => getCustomerDbAlignedStatus(deal) === "\uAC1C\uD1B5"
      );
      const regionalChangedDealsForSummary = regionalSummarySourceDeals.filter(
        (deal) => getCustomerDbAlignedStatus(deal) === "\uBCC0\uACBD"
      );
      const regionalChurnedDealsForSummary = regionalSummarySourceDeals.filter(
        (deal) => getChurnedAnalyticsDealLines(deal) > 0
      );
      const regionalSummary = {
        totalLineCount: regionalSummarySourceDeals.reduce((sum, deal) => sum + getAnalyticsDealRemainingLines(deal), 0),
        newDeals: regionalInboundDealsForSummary.length,
        activeDeals: regionalOpenedDealsForSummary.length,
        changedDeals: regionalChangedDealsForSummary.length,
        churnedDeals: regionalChurnedDealsForSummary.length,
        newLines: regionalInboundDealsForSummary.reduce((sum, deal) => sum + getAnalyticsDealLines(deal), 0),
        activeLines: regionalOpenedDealsForSummary.reduce((sum, deal) => sum + getAnalyticsDealLines(deal), 0),
        changedLines: regionalChangedDealsForSummary.reduce((sum, deal) => sum + getAnalyticsDealLines(deal), 0),
        churnedLines: regionalSummarySourceDeals.reduce((sum, deal) => sum + getChurnedAnalyticsDealLines(deal), 0)
      };
      const slotContracts = filtered.filter((c) => {
        if (hasSlotContractNumberHint(c)) return true;
        const productNames = getContractAnalyticsProductNames(c);
        return productNames.some((name) => isSlotLikeProduct(name));
      });
      const totalSlotCount = slotContracts.length;
      const viralContracts = filtered.filter((c) => {
        if (hasViralContractNumberHint(c)) return true;
        const productNames = getContractAnalyticsProductNames(c);
        return productNames.some((name) => isViralLikeProduct(name));
      });
      const viralContractCount = viralContracts.length;
      const currentMonthKey = getKoreanYearMonthKey(/* @__PURE__ */ new Date()) || "";
      const currentMonthMetricsMap = {};
      filteredWithoutDate.forEach((contract) => {
        const key = getKoreanYearMonthKey(contract.contractDate);
        if (!key) return;
        if (!currentMonthMetricsMap[key]) {
          currentMonthMetricsMap[key] = { sales: 0 };
        }
        currentMonthMetricsMap[key].sales += getGrossSalesAmount(contract);
      });
      const currentMonthSales = currentMonthMetricsMap[currentMonthKey]?.sales || 0;
      const settings = await storage.getSystemSettings();
      const targetSetting = settings.find((s) => s.settingKey === "monthly_sales_target");
      const monthlyTarget = targetSetting ? parseInt(targetSetting.settingValue) : 5e7;
      const monthlyAchievementRate = monthlyTarget > 0 ? Math.round(currentMonthSales / monthlyTarget * 1e3) / 10 : 0;
      const regionalMonthlySourceDeals = departmentFilterValue === REGIONAL_DEPARTMENT ? filteredDealsWithoutDate : regionalSummarySourceDeals;
      const anchorDate = normalizeToKoreanContractDate(endDateValue || /* @__PURE__ */ new Date()) ?? /* @__PURE__ */ new Date();
      const anchorMonthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
      const recent5MonthKeys = [];
      for (let offset = 4; offset >= 0; offset -= 1) {
        const monthDate = new Date(anchorMonthStart.getFullYear(), anchorMonthStart.getMonth() - offset, 1);
        recent5MonthKeys.push(`${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`);
      }
      const monthlyNewLineMap = {};
      recent5MonthKeys.forEach((key) => {
        monthlyNewLineMap[key] = 0;
      });
      regionalMonthlySourceDeals.forEach((deal) => {
        const openDate = getRegionalDealOpenAnalyticsDate(deal);
        const openDateKey = openDate ? getKoreanDateKey(openDate) : null;
        if (!openDateKey) return;
        const yearMonthKey = openDateKey.slice(0, 7);
        if (!(yearMonthKey in monthlyNewLineMap)) return;
        monthlyNewLineMap[yearMonthKey] += Math.max(0, toAmount(deal.lineCount));
      });
      const monthlyNewDealsData = recent5MonthKeys.map((key) => ({
        month: `${parseInt(key.split("-")[1], 10)}\uC6D4`,
        yearMonth: key,
        lineCount: monthlyNewLineMap[key] || 0
      }));
      const regionalMonthlyStatusData = await (async () => {
        const monthKeysInRange = buildRegionalMonthlyYearMonthRange(startDateValue || void 0, endDateValue || void 0);
        if (monthKeysInRange.length === 0) return [];
        const openLinesMap = new Map(monthKeysInRange.map((key) => [key, 0]));
        const churnLinesMap = new Map(monthKeysInRange.map((key) => [key, 0]));
        const managementCostMap = new Map(monthKeysInRange.map((key) => [key, 0]));
        const currentTotalLineCount = regionalMonthlySourceDeals.reduce(
          (sum, deal) => sum + Math.max(Number(deal.lineCount) || 0, 0),
          0
        );
        const monthMetaMap = new Map(
          monthKeysInRange.map((yearMonth) => {
            const monthStart = /* @__PURE__ */ new Date(`${yearMonth}-01T12:00:00+09:00`);
            const daysInMonth = Number.isNaN(monthStart.getTime()) ? 30 : new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
            return [
              yearMonth,
              {
                monthStartKey: `${yearMonth}-01`,
                daysInMonth,
                dayPrice: 500 / daysInMonth
              }
            ];
          })
        );
        const regionalManagementFeeRows = await db.select({
          feeDate: regionalManagementFees.feeDate,
          amount: regionalManagementFees.amount
        }).from(regionalManagementFees);
        regionalManagementFeeRows.forEach((row) => {
          const yearMonth = getKoreanDateKey(row.feeDate)?.slice(0, 7);
          if (!yearMonth || !managementCostMap.has(yearMonth)) return;
          managementCostMap.set(yearMonth, (managementCostMap.get(yearMonth) || 0) + Math.max(Number(row.amount) || 0, 0));
        });
        const regionalDealIds = regionalMonthlySourceDeals.map((deal) => deal.id).filter(Boolean);
        const timelineRows = regionalDealIds.length > 0 ? await db.select({
          dealId: dealTimelines.dealId,
          content: dealTimelines.content
        }).from(dealTimelines).where(inArray2(dealTimelines.dealId, regionalDealIds)) : [];
        const timelineContentByDealId = /* @__PURE__ */ new Map();
        timelineRows.forEach((timeline) => {
          const dealId = normalizeText(timeline.dealId);
          if (!dealId) return;
          const existing = timelineContentByDealId.get(dealId) || [];
          existing.push(String(timeline.content || ""));
          timelineContentByDealId.set(dealId, existing);
        });
        const regionalChurnChildrenByParentId = /* @__PURE__ */ new Map();
        regionalMonthlySourceDeals.forEach((deal) => {
          const parentDealId = normalizeText(deal.parentDealId);
          if (!parentDealId || deal.stage !== "churned") return;
          const churnCount = Math.max(Math.max(Number(deal.cancelledLineCount) || 0, Number(deal.lineCount) || 0), 0);
          if (churnCount <= 0) return;
          const existing = regionalChurnChildrenByParentId.get(parentDealId) || [];
          existing.push({
            count: churnCount,
            churnDateKey: deal.churnDate ? getKoreanDateKey(deal.churnDate) : null
          });
          regionalChurnChildrenByParentId.set(parentDealId, existing);
        });
        const getRegionalMonthlyChurnCount = (deal) => {
          if (deal.stage !== "churned") return 0;
          const baseCount = Math.max(Math.max(Number(deal.cancelledLineCount) || 0, Number(deal.lineCount) || 0), 0);
          if (baseCount <= 0) return 0;
          if (normalizeText(deal.parentDealId)) {
            return baseCount;
          }
          const dealId = normalizeText(deal.id);
          if (!dealId) return baseCount;
          const childRows = regionalChurnChildrenByParentId.get(dealId) || [];
          if (childRows.length === 0) return baseCount;
          const churnDateKey = deal.churnDate ? getKoreanDateKey(deal.churnDate) : null;
          const childCancelledCount = childRows.reduce((sum, child) => {
            if (!churnDateKey || !child.churnDateKey) {
              return sum + child.count;
            }
            return child.churnDateKey <= churnDateKey ? sum + child.count : sum;
          }, 0);
          return Math.max(baseCount - childCancelledCount, 0);
        };
        const applyOpenLines = (yearMonth, count2) => {
          if (!yearMonth || count2 <= 0) return;
          if (openLinesMap.has(yearMonth)) {
            openLinesMap.set(yearMonth, (openLinesMap.get(yearMonth) || 0) + count2);
          }
        };
        const applyChurnLines = (yearMonth, count2) => {
          if (!yearMonth || count2 <= 0) return;
          if (churnLinesMap.has(yearMonth)) {
            churnLinesMap.set(yearMonth, (churnLinesMap.get(yearMonth) || 0) + count2);
          }
        };
        regionalMonthlySourceDeals.forEach((deal) => {
          const lineCount = Math.max(Number(deal.lineCount) || 0, 0);
          const timelineContents = timelineContentByDealId.get(deal.id) || [];
          const addedEvents = timelineContents.map((content) => parseRegionalTimelineAddEventDetail(content)).filter((event) => !!event);
          const addedLineCount = addedEvents.reduce((sum, event) => sum + event.count, 0);
          const baseOpenLines = Math.max(lineCount - addedLineCount, 0);
          const openDate = getRegionalDealOpenAnalyticsDate(deal);
          const openMonthKey = openDate ? getKoreanYearMonthKey(openDate) : null;
          const openDateKey = openDate ? getKoreanDateKey(openDate) : null;
          applyOpenLines(openMonthKey, baseOpenLines);
          addedEvents.forEach((event) => applyOpenLines(event.yearMonth, event.count));
          const openRevenueEvents = [];
          if (openDateKey && baseOpenLines > 0) {
            openRevenueEvents.push({
              dateKey: openDateKey,
              yearMonth: openDateKey.slice(0, 7),
              count: baseOpenLines
            });
          }
          openRevenueEvents.push(...addedEvents);
          const churnRevenueEvents = [];
          if (deal.stage === "churned") {
            const fullChurnLines = getRegionalMonthlyChurnCount(deal);
            const churnDateKey = deal.churnDate ? getKoreanDateKey(deal.churnDate) : null;
            const churnMonthKey = deal.churnDate ? getKoreanYearMonthKey(deal.churnDate) : null;
            applyChurnLines(churnMonthKey, fullChurnLines);
            if (churnDateKey && fullChurnLines > 0) {
              churnRevenueEvents.push({
                dateKey: churnDateKey,
                yearMonth: churnDateKey.slice(0, 7),
                count: fullChurnLines
              });
            }
          }
        });
        const totalLinesByMonth = /* @__PURE__ */ new Map();
        if (monthKeysInRange.length > 0) {
          const latestMonthKey = monthKeysInRange[monthKeysInRange.length - 1];
          totalLinesByMonth.set(latestMonthKey, Math.max(currentTotalLineCount, 0));
          for (let index = monthKeysInRange.length - 2; index >= 0; index -= 1) {
            const nextMonthKey = monthKeysInRange[index + 1];
            const nextMonthTotal = totalLinesByMonth.get(nextMonthKey) || 0;
            const previousMonthTotal = Math.max(
              nextMonthTotal - (openLinesMap.get(nextMonthKey) || 0) + (churnLinesMap.get(nextMonthKey) || 0),
              0
            );
            totalLinesByMonth.set(monthKeysInRange[index], previousMonthTotal);
          }
        }
        const previousMonthTotalLinesByMonth = /* @__PURE__ */ new Map();
        monthKeysInRange.forEach((yearMonth, index) => {
          if (index === 0) {
            const currentMonthTotal = totalLinesByMonth.get(yearMonth) || 0;
            const previousMonthTotal = Math.max(
              currentMonthTotal - (openLinesMap.get(yearMonth) || 0) + (churnLinesMap.get(yearMonth) || 0),
              0
            );
            previousMonthTotalLinesByMonth.set(yearMonth, previousMonthTotal);
            return;
          }
          previousMonthTotalLinesByMonth.set(yearMonth, totalLinesByMonth.get(monthKeysInRange[index - 1]) || 0);
        });
        return monthKeysInRange.map((yearMonth) => {
          const openLines = openLinesMap.get(yearMonth) || 0;
          const churnLines = churnLinesMap.get(yearMonth) || 0;
          const totalMovement = openLines + churnLines;
          const totalLines2 = totalLinesByMonth.get(yearMonth) || 0;
          const previousMonthTotalLines = previousMonthTotalLinesByMonth.get(yearMonth) || 0;
          const monthMeta = monthMetaMap.get(yearMonth);
          let openedRevenue = 0;
          let churnDeduction = 0;
          if (monthMeta) {
            regionalMonthlySourceDeals.forEach((deal) => {
              const lineCount = Math.max(Number(deal.lineCount) || 0, 0);
              const timelineContents = timelineContentByDealId.get(deal.id) || [];
              const addedEvents = timelineContents.map((content) => parseRegionalTimelineAddEventDetail(content)).filter((event) => !!event);
              const addedLineCount = addedEvents.reduce((sum, event) => sum + event.count, 0);
              const baseOpenLines = Math.max(lineCount - addedLineCount, 0);
              const openDate = getRegionalDealOpenAnalyticsDate(deal);
              const openDateKey = openDate ? getKoreanDateKey(openDate) : null;
              const openRevenueEvents = [];
              if (openDateKey && baseOpenLines > 0) {
                openRevenueEvents.push({
                  dateKey: openDateKey,
                  yearMonth: openDateKey.slice(0, 7),
                  count: baseOpenLines
                });
              }
              openRevenueEvents.push(...addedEvents);
              const churnRevenueEvents = [];
              if (deal.stage === "churned") {
                const fullChurnLines = getRegionalMonthlyChurnCount(deal);
                const churnDateKey = deal.churnDate ? getKoreanDateKey(deal.churnDate) : null;
                if (churnDateKey && fullChurnLines > 0) {
                  churnRevenueEvents.push({
                    dateKey: churnDateKey,
                    yearMonth: churnDateKey.slice(0, 7),
                    count: fullChurnLines
                  });
                }
              }
              openedRevenue += openRevenueEvents.filter((event) => event.yearMonth === yearMonth).reduce((sum, event) => {
                const openDay = Number.parseInt(event.dateKey.slice(8, 10), 10) || 0;
                return sum + event.count * monthMeta.dayPrice * Math.max(monthMeta.daysInMonth - openDay + 1, 0);
              }, 0);
              churnDeduction += churnRevenueEvents.filter((event) => event.yearMonth === yearMonth).reduce((sum, event) => {
                const churnDay = Number.parseInt(event.dateKey.slice(8, 10), 10) || 0;
                return sum + event.count * monthMeta.dayPrice * Math.max(monthMeta.daysInMonth - churnDay, 0);
              }, 0);
            });
          }
          const operatingSales = Math.max(previousMonthTotalLines * 500 + openedRevenue - churnDeduction, 0);
          return {
            yearMonth,
            monthLabel: `${parseInt(yearMonth.split("-")[1] || "0", 10)}\uC6D4`,
            openLines,
            churnLines,
            openRate: totalMovement > 0 ? openLines / totalMovement * 100 : 0,
            churnRate: totalMovement > 0 ? churnLines / totalMovement * 100 : 0,
            openTarget: REGIONAL_MONTHLY_OPEN_TARGET,
            churnDefenseTarget: REGIONAL_MONTHLY_CHURN_DEFENSE_TARGET,
            openAchievementRate: REGIONAL_MONTHLY_OPEN_TARGET > 0 ? openLines / REGIONAL_MONTHLY_OPEN_TARGET * 100 : 0,
            churnDefenseAchievementRate: REGIONAL_MONTHLY_CHURN_DEFENSE_TARGET > 0 ? churnLines / REGIONAL_MONTHLY_CHURN_DEFENSE_TARGET * 100 : 0,
            totalLines: totalLines2,
            sales: Math.max(Math.round(operatingSales), 0),
            managementCost: managementCostMap.get(yearMonth) || 0,
            monthlyLines: totalLines2,
            churnLineRate: totalMovement > 0 ? churnLines / totalMovement * 100 : 0
          };
        });
      })();
      const productLineMap = {};
      filteredDeals.forEach((d) => {
        const product = products2.find((p) => p.id === d.productId);
        const pName = product?.name || "\uAE30\uD0C0";
        productLineMap[pName] = (productLineMap[pName] || 0) + getAnalyticsDealLines(d);
      });
      const totalLines = Object.values(productLineMap).reduce((s, v) => s + v, 0);
      const productLineData = Object.entries(productLineMap).sort(([, a], [, b]) => b - a).map(([name, lines], i) => ({
        name,
        value: totalLines > 0 ? Math.round(lines / totalLines * 1e3) / 10 : 0,
        lines,
        color: colors[i % colors.length]
      }));
      const managerLineMap = {};
      for (const d of filteredDeals) {
        let mgrName = "\uBBF8\uC9C0\uC815";
        if (d.customerId) {
          const contract = filtered.find((c) => c.customerId === d.customerId);
          if (contract) mgrName = contract.managerName;
        }
        if (!managerLineMap[mgrName]) managerLineMap[mgrName] = { lines: 0, newCount: 0, activeCount: 0, churnedCount: 0 };
        managerLineMap[mgrName].lines += getAnalyticsDealLines(d);
        if (d.stage === "new") managerLineMap[mgrName].newCount += 1;
        else if (d.stage === "active") managerLineMap[mgrName].activeCount += 1;
        if (getChurnedAnalyticsDealLines(d) > 0) managerLineMap[mgrName].churnedCount += 1;
      }
      const managerLineData = Object.entries(managerLineMap).sort(([, a], [, b]) => b.lines - a.lines).map(([manager, val]) => ({
        manager,
        \uD68C\uC120\uC218: val.lines,
        \uC778\uC785: val.newCount,
        \uAC1C\uD1B5: val.activeCount,
        \uD574\uC9C0: val.churnedCount
      }));
      const productTimelineMap = {};
      for (const d of filteredDeals) {
        const product = products2.find((p) => p.id === d.productId);
        const pName = product?.name || "\uAE30\uD0C0";
        const timelines = await storage.getDealTimelines(d.id);
        if (timelines.length > 0) {
          const latest = timelines.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
          if (!productTimelineMap[pName] || new Date(latest.createdAt) > new Date(productTimelineMap[pName].createdAt)) {
            productTimelineMap[pName] = {
              dealId: d.id,
              productName: pName,
              content: latest.content,
              authorName: latest.authorName || "",
              createdAt: latest.createdAt.toISOString ? latest.createdAt.toISOString() : String(latest.createdAt)
            };
          }
        }
      }
      const productTimelineData = Object.values(productTimelineMap).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json({
        isExecutive: !!isExecutive,
        userName: currentUser?.name || "",
        summary: { totalSales, totalRefunds, netSales, contractCount, avgDealAmount, confirmedCount, confirmRate },
        monthlyData,
        productData,
        marketingProductData,
        managerData,
        departmentData,
        dealsSummary: {
          totalLineCount,
          newDeals,
          activeDeals,
          changedDeals,
          churnedDeals,
          newLines,
          activeLines,
          changedLines,
          churnedLines,
          totalSlotCount,
          viralContractCount,
          monthlyAchievementRate,
          currentMonthSales
        },
        regionalData: {
          summary: regionalSummary,
          monthlyNewDealsData,
          monthlyStatusData: regionalMonthlyStatusData,
          productLineData,
          managerLineData,
          productTimelineData
        }
      });
    } catch (error) {
      console.error("Error fetching sales analytics:", error);
      res.status(500).json({ error: "Failed to fetch sales analytics" });
    }
  });
  app2.get("/api/system-settings", async (_req, res) => {
    try {
      const settings = await storage.getSystemSettings();
      const settingsMap = {};
      settings.forEach((s) => {
        settingsMap[s.settingKey] = s.settingValue;
      });
      res.json(settingsMap);
    } catch (error) {
      console.error("Error fetching system settings:", error);
      res.status(500).json({ error: "Failed to fetch system settings" });
    }
  });
  app2.get("/api/notices", requireAuth, async (req, res) => {
    try {
      const noticeList = await storage.getNotices();
      res.json(noticeList);
    } catch (error) {
      console.error("Error fetching notices:", error);
      res.status(500).json({ error: "Failed to fetch notices" });
    }
  });
  app2.get("/api/notices/:id", requireAuth, async (req, res) => {
    try {
      const noticeId = toSingleString(req.params.id);
      const notice = await storage.getNotice(noticeId);
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      await storage.incrementNoticeViewCount(noticeId);
      res.json({ ...notice, viewCount: (notice.viewCount || 0) + 1 });
    } catch (error) {
      console.error("Error fetching notice:", error);
      res.status(500).json({ error: "Failed to fetch notice" });
    }
  });
  app2.post("/api/notices", requireAdmin, async (req, res) => {
    try {
      const parsed = insertNoticeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid notice data", details: parsed.error });
      }
      const notice = await storage.createNotice(parsed.data);
      res.status(201).json(notice);
    } catch (error) {
      console.error("Error creating notice:", error);
      res.status(500).json({ error: "Failed to create notice" });
    }
  });
  app2.put("/api/notices/:id", requireAdmin, async (req, res) => {
    try {
      const noticeId = toSingleString(req.params.id);
      const parsed = insertNoticeSchema.partial().safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid notice data", details: parsed.error });
      }
      const notice = await storage.updateNotice(noticeId, parsed.data);
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      res.json(notice);
    } catch (error) {
      console.error("Error updating notice:", error);
      res.status(500).json({ error: "Failed to update notice" });
    }
  });
  app2.delete("/api/notices/:id", requireAdmin, async (req, res) => {
    try {
      const noticeId = toSingleString(req.params.id);
      await storage.deleteNotice(noticeId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting notice:", error);
      res.status(500).json({ error: "Failed to delete notice" });
    }
  });
  app2.put("/api/system-settings", requireDeveloper, async (req, res) => {
    try {
      const settingsSchema = z.record(z.string(), z.string());
      const parsed = settingsSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid settings data", details: parsed.error });
      }
      await storage.setSystemSettingsBulk(parsed.data);
      await writeSystemLog(req, {
        actionType: "settings_change",
        action: "\uC2DC\uC2A4\uD15C \uC124\uC815 \uBCC0\uACBD",
        details: `keys=${Object.keys(parsed.data).join(",")}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving system settings:", error);
      res.status(500).json({ error: "Failed to save system settings" });
    }
  });
  async function requireDeveloper(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
    }
    const currentUser = await storage.getUser(req.session.userId);
    if (!currentUser || currentUser.role !== "\uAC1C\uBC1C\uC790") {
      return res.status(403).json({ error: "\uAC1C\uBC1C\uC790 \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
    }
    next();
  }
  async function collectBackupTables() {
    return {
      users: await db.select().from(users),
      customers: await db.select().from(customers),
      contacts: await db.select().from(contacts),
      deals: await db.select().from(deals),
      dealTimelines: await db.select().from(dealTimelines),
      regionalCustomerLists: await db.select().from(regionalCustomerLists),
      activities: await db.select().from(activities),
      payments: await db.select().from(payments),
      products: await db.select().from(products),
      contracts: await db.select().from(contracts),
      refunds: await db.select().from(refunds),
      keeps: await db.select().from(keeps),
      regionalManagementFees: await db.select().from(regionalManagementFees),
      deposits: await db.select().from(deposits),
      notices: await db.select().from(notices),
      pagePermissions: await db.select().from(pagePermissions),
      systemSettings: await db.select().from(systemSettings),
      systemLogs: await db.select().from(systemLogs)
    };
  }
  app2.use("/api/backups", requireAuth);
  app2.get("/api/backups", requireDeveloper, async (_req, res) => {
    try {
      const backupList = await storage.getBackups();
      res.json(backupList);
    } catch (error) {
      console.error("Error fetching backups:", error);
      res.status(500).json({ error: "\uBC31\uC5C5 \uBAA9\uB85D \uC870\uD68C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.get("/api/backups/status", requireDeveloper, async (_req, res) => {
    try {
      const backups = await storage.getBackups();
      const retentionCount = await getBackupRetentionCount();
      const totalSizeBytes = backups.reduce((sum, item) => sum + (item.sizeBytes || 0), 0);
      const latest = backups[0] || null;
      res.json({
        count: backups.length,
        retentionCount,
        totalSizeBytes,
        latestBackup: latest ? {
          id: latest.id,
          label: latest.label,
          createdAt: latest.createdAt,
          sizeBytes: latest.sizeBytes,
          createdByName: latest.createdByName
        } : null
      });
    } catch (error) {
      console.error("Error fetching backup status:", error);
      res.status(500).json({ error: "\uBC31\uC5C5 \uC0C1\uD0DC \uC870\uD68C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.post("/api/backups", requireDeveloper, async (req, res) => {
    const releaseLock = await tryAcquireBackupOperationLock();
    if (!releaseLock) {
      return res.status(409).json({ error: "\uB2E4\uB978 \uBC31\uC5C5/\uBCF5\uC6D0 \uC791\uC5C5\uC774 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." });
    }
    try {
      assertBackupEncryptionReadyForProduction();
      const userId = req.session.userId;
      const currentUser = userId ? await storage.getUser(userId) : null;
      const backupTables = await collectBackupTables();
      const tableCounts = {};
      for (const [key, rows] of Object.entries(backupTables)) {
        tableCounts[key] = rows.length;
      }
      const backupPayload = buildBackupPayload(backupTables);
      const serializedBackup = serializeBackupData(JSON.stringify(backupPayload));
      const backupData = serializedBackup.stored;
      const sizeBytes = Buffer.byteLength(backupData, "utf-8");
      if (sizeBytes > BACKUP_MAX_BYTES) {
        return res.status(413).json({
          error: `\uBC31\uC5C5 \uB370\uC774\uD130 \uC6A9\uB7C9\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4. (${Math.round(sizeBytes / (1024 * 1024))}MB)`
        });
      }
      const rawLabel = toSingleString(req.body?.label).trim();
      const label = rawLabel || `\uBC31\uC5C5 ${(/* @__PURE__ */ new Date()).toLocaleString("ko-KR", { timeZone: cachedTimezone })}`;
      const backup = await storage.createBackup({
        label,
        createdByName: currentUser?.name || "Unknown",
        createdByUserId: userId || null,
        tableCounts: JSON.stringify(tableCounts),
        sizeBytes,
        data: backupData
      });
      await writeSystemLog(req, {
        actionType: "data_backup",
        action: `\uB370\uC774\uD130 \uBC31\uC5C5 \uC0DD\uC131: ${label}`,
        details: `tables=${Object.keys(tableCounts).length}, sizeKB=${(sizeBytes / 1024).toFixed(1)}, encrypted=${serializedBackup.encrypted}, sha256=${backupPayload.integrity.contentHash.slice(0, 16)}`
      });
      const retentionCount = await getBackupRetentionCount();
      const prunedCount = await pruneOldBackups(retentionCount);
      if (prunedCount > 0) {
        await writeSystemLog(req, {
          actionType: "data_backup",
          action: `\uBC31\uC5C5 \uBCF4\uC874 \uC815\uCC45 \uC815\uB9AC \uC2E4\uD589 (\uBCF4\uC874 ${retentionCount}\uAC1C)`,
          details: `deletedBackups=${prunedCount}`
        });
      }
      const { data: _, ...backupMeta } = backup;
      res.json(backupMeta);
    } catch (error) {
      console.error("Error creating backup:", error);
      res.status(500).json({ error: "\uBC31\uC5C5 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    } finally {
      await releaseLock();
    }
  });
  app2.get("/api/backups/:id/download", requireDeveloper, async (req, res) => {
    try {
      const backupId = toSingleString(req.params.id);
      const backup = await storage.getBackup(backupId);
      if (!backup) {
        return res.status(404).json({ error: "\uBC31\uC5C5\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      let integrityHash = "";
      try {
        const parsedPayload = JSON.parse(deserializeBackupData(backup.data).plaintext);
        const integrity = verifyBackupPayloadIntegrity(parsedPayload);
        integrityHash = integrity.hash;
      } catch {
        integrityHash = "";
      }
      await writeSystemLog(req, {
        actionType: "data_backup",
        action: `\uB370\uC774\uD130 \uBC31\uC5C5 \uB2E4\uC6B4\uB85C\uB4DC: ${backup.label || backup.id}`,
        details: `backupId=${backup.id}`
      });
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", `attachment; filename="crm-backup-${backup.id}.json"`);
      if (integrityHash) {
        res.setHeader("X-Backup-Sha256", integrityHash);
      }
      res.send(deserializeBackupData(backup.data).plaintext);
    } catch (error) {
      console.error("Error downloading backup:", error);
      res.status(500).json({ error: "\uBC31\uC5C5 \uB2E4\uC6B4\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.delete("/api/backups/:id", requireDeveloper, async (req, res) => {
    const releaseLock = await tryAcquireBackupOperationLock();
    if (!releaseLock) {
      return res.status(409).json({ error: "\uBC31\uC5C5/\uBCF5\uC6D0 \uC791\uC5C5 \uC911\uC5D0\uB294 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
    }
    try {
      const backupId = toSingleString(req.params.id);
      const backup = await storage.getBackup(backupId);
      await storage.deleteBackup(backupId);
      await writeSystemLog(req, {
        actionType: "data_backup",
        action: `\uB370\uC774\uD130 \uBC31\uC5C5 \uC0AD\uC81C: ${backup?.label || backupId}`,
        details: `backupId=${backupId}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting backup:", error);
      res.status(500).json({ error: "\uBC31\uC5C5 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    } finally {
      await releaseLock();
    }
  });
  app2.post("/api/backups/:id/restore", requireDeveloper, async (req, res) => {
    const releaseLock = await tryAcquireBackupOperationLock();
    if (!releaseLock) {
      return res.status(409).json({ error: "\uB2E4\uB978 \uBC31\uC5C5/\uBCF5\uC6D0 \uC791\uC5C5\uC774 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." });
    }
    try {
      if (!req.body.confirm) {
        return res.status(400).json({ error: "\uBCF5\uC6D0 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
      }
      const backupId = toSingleString(req.params.id);
      const backup = await storage.getBackup(backupId);
      if (!backup) {
        return res.status(404).json({ error: "\uBC31\uC5C5\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const backupData = JSON.parse(deserializeBackupData(backup.data).plaintext);
      const integrity = verifyBackupPayloadIntegrity(backupData);
      if (!integrity.isValid) {
        return res.status(400).json({ error: `\uBC31\uC5C5 \uBB34\uACB0\uC131 \uAC80\uC99D \uC2E4\uD328(${integrity.reason})` });
      }
      const tables = backupData.tables;
      const tableValidation = validateBackupTablesShape(tables);
      if (!tableValidation.isValid) {
        return res.status(400).json({
          error: "\uBC31\uC5C5 \uB370\uC774\uD130 \uAD6C\uC870\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
          details: {
            missingTables: tableValidation.missing,
            invalidTables: tableValidation.invalid
          }
        });
      }
      const userId = req.session.userId;
      const currentUser = userId ? await storage.getUser(userId) : null;
      assertBackupEncryptionReadyForProduction();
      const preRestoreTables = await collectBackupTables();
      const preRestorePayload = buildBackupPayload(preRestoreTables);
      const serializedPreRestore = serializeBackupData(JSON.stringify(preRestorePayload));
      const preRestoreData = serializedPreRestore.stored;
      const preRestoreSizeBytes = Buffer.byteLength(preRestoreData, "utf-8");
      if (preRestoreSizeBytes > BACKUP_MAX_BYTES) {
        return res.status(413).json({
          error: `\uBCF5\uC6D0 \uC804 \uC790\uB3D9 \uBC31\uC5C5 \uC6A9\uB7C9\uC774 \uC81C\uD55C\uC744 \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4. (${Math.round(preRestoreSizeBytes / (1024 * 1024))}MB)`
        });
      }
      const preRestoreTableCounts = {};
      for (const [key, rows] of Object.entries(preRestoreTables)) {
        preRestoreTableCounts[key] = rows.length;
      }
      const preRestoreLabel = "AUTO_PRE_RESTORE_" + (/* @__PURE__ */ new Date()).toLocaleString("ko-KR", { timeZone: cachedTimezone });
      await storage.createBackup({
        label: preRestoreLabel,
        createdByName: currentUser?.name || "system",
        createdByUserId: userId || null,
        tableCounts: JSON.stringify(preRestoreTableCounts),
        sizeBytes: preRestoreSizeBytes,
        data: preRestoreData
      });
      await db.transaction(async (tx) => {
        await tx.delete(dealTimelines);
        await tx.delete(regionalCustomerLists);
        await tx.delete(activities);
        await tx.delete(refunds);
        await tx.delete(keeps);
        await tx.delete(regionalManagementFees);
        await tx.delete(deposits);
        await tx.delete(payments);
        await tx.delete(contracts);
        await tx.delete(contacts);
        await tx.delete(deals);
        await tx.delete(customers);
        await tx.delete(products);
        await tx.delete(notices);
        await tx.delete(pagePermissions);
        await tx.delete(systemSettings);
        await tx.delete(systemLogs);
        await tx.delete(users);
        if (tables.users?.length) await tx.insert(users).values(tables.users);
        if (tables.customers?.length) await tx.insert(customers).values(tables.customers);
        if (tables.contacts?.length) await tx.insert(contacts).values(tables.contacts);
        if (tables.products?.length) await tx.insert(products).values(tables.products);
        if (tables.deals?.length) await tx.insert(deals).values(tables.deals);
        if (tables.dealTimelines?.length) await tx.insert(dealTimelines).values(tables.dealTimelines);
        if (tables.regionalCustomerLists?.length) await tx.insert(regionalCustomerLists).values(tables.regionalCustomerLists);
        if (tables.activities?.length) await tx.insert(activities).values(tables.activities);
        if (tables.contracts?.length) await tx.insert(contracts).values(tables.contracts);
        if (tables.refunds?.length) await tx.insert(refunds).values(tables.refunds);
        if (tables.keeps?.length) await tx.insert(keeps).values(tables.keeps);
        if (tables.regionalManagementFees?.length) await tx.insert(regionalManagementFees).values(tables.regionalManagementFees);
        if (tables.payments?.length) await tx.insert(payments).values(tables.payments);
        if (tables.deposits?.length) await tx.insert(deposits).values(tables.deposits);
        if (tables.notices?.length) await tx.insert(notices).values(tables.notices);
        if (tables.pagePermissions?.length) await tx.insert(pagePermissions).values(tables.pagePermissions);
        if (tables.systemSettings?.length) await tx.insert(systemSettings).values(tables.systemSettings);
        if (tables.systemLogs?.length) await tx.insert(systemLogs).values(tables.systemLogs);
      });
      await writeSystemLog(req, {
        actionType: "data_backup",
        action: `\uB370\uC774\uD130 \uBC31\uC5C5 \uBCF5\uC6D0: ${backup.label || backup.id}`,
        details: `backupId=${backup.id}, integrity=${integrity.reason}, encryptedSnapshot=${serializedPreRestore.encrypted}, sha256=${integrity.hash.slice(0, 16)}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error restoring backup:", error);
      res.status(500).json({ error: "\uBC31\uC5C5 \uBCF5\uC6D0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    } finally {
      await releaseLock();
    }
  });
  const ADMIN_TABLE_WHITELIST = [
    "users",
    "customers",
    "contacts",
    "deals",
    "deal_timelines",
    "regional_customer_lists",
    "activities",
    "payments",
    "system_logs",
    "products",
    "contracts",
    "refunds",
    "keeps",
    "deposits",
    "notices",
    "page_permissions",
    "system_settings",
    "database_backups"
  ];
  app2.get("/api/admin/schema", requireDeveloper, async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          t.table_name,
          c.column_name,
          c.data_type,
          c.character_maximum_length,
          c.is_nullable,
          c.column_default,
          CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as is_primary_key,
          CASE WHEN fk.column_name IS NOT NULL THEN true ELSE false END as is_foreign_key,
          fk.foreign_table_name,
          fk.foreign_column_name
        FROM information_schema.tables t
        JOIN information_schema.columns c ON t.table_name = c.table_name AND t.table_schema = c.table_schema
        LEFT JOIN (
          SELECT ku.table_name, ku.column_name
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage ku ON tc.constraint_name = ku.constraint_name
          WHERE tc.constraint_type = 'PRIMARY KEY' AND tc.table_schema = 'public'
        ) pk ON pk.table_name = c.table_name AND pk.column_name = c.column_name
        LEFT JOIN (
          SELECT 
            ku.table_name, ku.column_name,
            ccu.table_name as foreign_table_name,
            ccu.column_name as foreign_column_name
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage ku ON tc.constraint_name = ku.constraint_name
          JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
          WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
        ) fk ON fk.table_name = c.table_name AND fk.column_name = c.column_name
        WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
        ORDER BY t.table_name, c.ordinal_position
      `);
      const tables = {};
      for (const row of result.rows) {
        if (!tables[row.table_name]) {
          tables[row.table_name] = { name: row.table_name, columns: [] };
        }
        tables[row.table_name].columns.push({
          name: row.column_name,
          type: row.data_type,
          maxLength: row.character_maximum_length,
          nullable: row.is_nullable === "YES",
          defaultValue: row.column_default,
          isPrimaryKey: row.is_primary_key,
          isForeignKey: row.is_foreign_key,
          foreignTable: row.foreign_table_name,
          foreignColumn: row.foreign_column_name
        });
      }
      const countResult = await pool.query(`
        SELECT schemaname, relname as table_name, n_live_tup as row_count
        FROM pg_stat_user_tables WHERE schemaname = 'public'
      `);
      for (const row of countResult.rows) {
        if (tables[row.table_name]) {
          tables[row.table_name].rowCount = parseInt(row.row_count) || 0;
        }
      }
      res.json(Object.values(tables));
    } catch (error) {
      console.error("Error fetching schema:", error);
      res.status(500).json({ error: "\uC2A4\uD0A4\uB9C8 \uC870\uD68C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.get("/api/admin/tables/:table/rows", requireDeveloper, async (req, res) => {
    try {
      const table = toSingleString(req.params.table);
      if (!ADMIN_TABLE_WHITELIST.includes(table)) {
        return res.status(400).json({ error: "\uD5C8\uC6A9\uB418\uC9C0 \uC54A\uB294 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4." });
      }
      const limit = Math.min(parseInt(req.query.limit) || 50, 200);
      const offset = parseInt(req.query.offset) || 0;
      const orderBy = req.query.orderBy || "id";
      const orderDir = req.query.orderDir === "asc" ? "ASC" : "DESC";
      const search = req.query.search;
      const colCheck = await pool.query(
        `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,
        [table]
      );
      const validColumns = colCheck.rows.map((r) => r.column_name);
      const safeOrderBy = validColumns.includes(orderBy) ? orderBy : validColumns[0] || "id";
      let whereClause = "";
      const params = [limit, offset];
      const encryptedColumns = new Set(getRawTablePiiColumns(table));
      if (search && search.trim()) {
        const textCols = validColumns.filter((col) => !encryptedColumns.has(col)).slice(0, 5);
        if (textCols.length > 0) {
          const conditions = textCols.map((col, i) => `CAST("${col}" AS TEXT) ILIKE $${i + 3}`);
          whereClause = `WHERE ${conditions.join(" OR ")}`;
          for (let i = 0; i < textCols.length; i++) {
            params.push(`%${search.trim()}%`);
          }
        }
      }
      const countResult = await pool.query(
        `SELECT COUNT(*) as total FROM "${table}" ${whereClause}`,
        whereClause ? params.slice(2) : []
      );
      const total = parseInt(countResult.rows[0].total);
      const dataResult = await pool.query(
        `SELECT * FROM "${table}" ${whereClause} ORDER BY "${safeOrderBy}" ${orderDir} LIMIT $1 OFFSET $2`,
        params
      );
      const sensitiveColumns = ["password"];
      const rows = dataResult.rows.map((row) => {
        const cleaned = decryptRawTableRow(table, row);
        for (const col of sensitiveColumns) {
          if (cleaned[col]) cleaned[col] = "********";
        }
        return cleaned;
      });
      res.json({ rows, total, limit, offset, columns: validColumns });
    } catch (error) {
      console.error("Error fetching table data:", error);
      res.status(500).json({ error: "\uB370\uC774\uD130 \uC870\uD68C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.put("/api/admin/tables/:table/rows/:id", requireDeveloper, async (req, res) => {
    try {
      const table = toSingleString(req.params.table);
      const id = toSingleString(req.params.id);
      if (!ADMIN_TABLE_WHITELIST.includes(table)) {
        return res.status(400).json({ error: "\uD5C8\uC6A9\uB418\uC9C0 \uC54A\uB294 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4." });
      }
      const updates = req.body;
      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "\uC218\uC815\uD560 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const colCheck = await pool.query(
        `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,
        [table]
      );
      const validColumns = colCheck.rows.map((r) => r.column_name);
      const forbiddenColumns = ["id", "password"];
      const setClauses = [];
      const values = [];
      let paramIndex = 1;
      const encryptedUpdates = encryptRawTablePayload(table, updates);
      for (const [key, value] of Object.entries(encryptedUpdates)) {
        if (!validColumns.includes(key) || forbiddenColumns.includes(key)) continue;
        setClauses.push(`"${key}" = $${paramIndex}`);
        values.push(value === "" ? null : value);
        paramIndex++;
      }
      if (setClauses.length === 0) {
        return res.status(400).json({ error: "\uC720\uD6A8\uD55C \uC218\uC815 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      values.push(id);
      await pool.query(
        `UPDATE "${table}" SET ${setClauses.join(", ")} WHERE id = $${paramIndex}`,
        values
      );
      const currentUser = await storage.getUser(req.session.userId);
      await storage.createSystemLog({
        userId: req.session.userId,
        loginId: currentUser?.loginId || "",
        userName: currentUser?.name || "Unknown",
        action: `\uC5B4\uB4DC\uBBFC \uB370\uC774\uD130 \uC218\uC815: ${table}/${id}`,
        actionType: "settings_change",
        ipAddress: req.headers["x-forwarded-for"] || req.ip || "",
        userAgent: req.headers["user-agent"] || "",
        details: `\uD14C\uC774\uBE14 ${table}, ID: ${id}, \uC218\uC815 \uD56D\uBAA9: ${Object.keys(updates).join(", ")}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating row:", error);
      res.status(500).json({ error: "\uB370\uC774\uD130 \uC218\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.delete("/api/admin/tables/:table/rows/:id", requireDeveloper, async (req, res) => {
    try {
      const table = toSingleString(req.params.table);
      const id = toSingleString(req.params.id);
      if (!ADMIN_TABLE_WHITELIST.includes(table)) {
        return res.status(400).json({ error: "\uD5C8\uC6A9\uB418\uC9C0 \uC54A\uB294 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4." });
      }
      await pool.query(`DELETE FROM "${table}" WHERE id = $1`, [id]);
      const currentUser = await storage.getUser(req.session.userId);
      await storage.createSystemLog({
        userId: req.session.userId,
        loginId: currentUser?.loginId || "",
        userName: currentUser?.name || "Unknown",
        action: `\uC5B4\uB4DC\uBBFC \uB370\uC774\uD130 \uC0AD\uC81C: ${table}/${id}`,
        actionType: "settings_change",
        ipAddress: req.headers["x-forwarded-for"] || req.ip || "",
        userAgent: req.headers["user-agent"] || "",
        details: `\uD14C\uC774\uBE14 ${table}, ID: ${id}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting row:", error);
      res.status(500).json({ error: "\uB370\uC774\uD130 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." });
    }
  });
  app2.post("/api/admin/sql", requireDeveloper, async (req, res) => {
    try {
      const { query, allowWrite } = req.body;
      if (!query || typeof query !== "string" || query.trim().length === 0) {
        return res.status(400).json({ error: "SQL \uCFFC\uB9AC\uAC00 \uBE44\uC5B4\uC788\uC2B5\uB2C8\uB2E4." });
      }
      const trimmedQuery = query.trim().toUpperCase();
      const isWriteQuery = /^(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE)/i.test(trimmedQuery);
      if (isWriteQuery && !allowWrite) {
        return res.status(400).json({
          error: "\uC4F0\uAE30 \uCFFC\uB9AC\uC785\uB2C8\uB2E4. \uC2E4\uD589\uD558\uB824\uBA74 '\uC4F0\uAE30 \uD5C8\uC6A9'\uC744 \uCCB4\uD06C\uD574\uC8FC\uC138\uC694.",
          isWriteQuery: true
        });
      }
      if (/^(DROP|ALTER|TRUNCATE|CREATE)/i.test(trimmedQuery)) {
        return res.status(400).json({ error: "DDL \uCFFC\uB9AC(DROP, ALTER, TRUNCATE, CREATE)\uB294 \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const startTime = Date.now();
      const client = await pool.connect();
      try {
        await client.query("SET statement_timeout = '10000'");
        const result = await client.query(query);
        const executionTime = Date.now() - startTime;
        const currentUser = await storage.getUser(req.session.userId);
        await storage.createSystemLog({
          userId: req.session.userId,
          loginId: currentUser?.loginId || "",
          userName: currentUser?.name || "Unknown",
          action: "\uC5B4\uB4DC\uBBFC SQL \uC2E4\uD589",
          actionType: "settings_change",
          ipAddress: req.headers["x-forwarded-for"] || req.ip || "",
          userAgent: req.headers["user-agent"] || "",
          details: `SQL: ${query.substring(0, 500)}`
        });
        const maxRows = 500;
        const truncated = result.rows && result.rows.length > maxRows;
        const rows = truncated ? result.rows.slice(0, maxRows) : result.rows || [];
        const sensitiveColumns = ["password"];
        const sanitizedRows = rows.map((row) => {
          const cleaned = { ...row };
          for (const col of sensitiveColumns) {
            if (cleaned[col]) cleaned[col] = "********";
          }
          return cleaned;
        });
        res.json({
          rows: sanitizedRows,
          fields: result.fields?.map((f) => ({ name: f.name, dataTypeID: f.dataTypeID })) || [],
          rowCount: result.rowCount,
          totalRows: result.rows?.length || 0,
          truncated,
          executionTime,
          command: result.command
        });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("SQL execution error:", error);
      res.status(400).json({ error: error.message || "SQL \uC2E4\uD589 \uC624\uB958" });
    }
  });
  const bulkUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });
  const hasBulkImportCellValue = (value) => value !== void 0 && value !== null && String(value).trim() !== "";
  const parseBulkImportNumber = (value, fallback = 0) => {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : fallback;
    }
    const raw = String(value ?? "").trim();
    if (!raw) return fallback;
    const isParenthesizedNegative = /^\(.*\)$/.test(raw);
    const normalized = raw.replace(/,/g, "").replace(/[₩원\s]/g, "");
    const match = normalized.match(/[+-]?\d+(?:\.\d+)?/);
    if (!match) return fallback;
    const parsed = Number(match[0]);
    if (!Number.isFinite(parsed)) return fallback;
    return isParenthesizedNegative ? -Math.abs(parsed) : parsed;
  };
  const parseBulkImportInteger = (value, fallback = 0) => Math.round(parseBulkImportNumber(value, fallback));
  const getBulkImportMappedRawValue = (rawData, mappingConfig, targetField) => {
    let rawObject;
    try {
      rawObject = typeof rawData === "string" ? JSON.parse(rawData || "{}") : {};
    } catch {
      rawObject = {};
    }
    for (const [header, value] of Object.entries(rawObject)) {
      const normalizedHeader = String(header || "").trim();
      if (!normalizedHeader) continue;
      if (mappingConfig[normalizedHeader] === targetField) return value;
      for (const [mappedHeader, field] of Object.entries(mappingConfig)) {
        if (field === targetField && normalizedHeader.startsWith(mappedHeader)) {
          return value;
        }
      }
    }
    return void 0;
  };
  app2.post("/api/bulk-import/upload", autoLoginDev, requireAuth, async (req, res, next) => {
    try {
      const currentUser = await storage.getUser(req.session.userId);
      if (!currentUser || !PERMISSION_ADMIN_ROLES.includes(currentUser.role || "")) {
        return res.status(403).json({ error: "\uAD00\uB9AC\uC790 \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4." });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: "\uAD8C\uD55C \uD655\uC778 \uC2E4\uD328" });
    }
  }, bulkUpload.single("file"), async (req, res) => {
    try {
      const currentUser = await storage.getUser(req.session.userId);
      if (!req.file) {
        return res.status(400).json({ error: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const selectedSheet = req.body?.sheetName;
      if (!selectedSheet) {
        const sheetList = workbook.SheetNames.map((name) => {
          const ws = workbook.Sheets[name];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          let detectedType = "\uAE30\uD0C0";
          if (name.includes("\uC2AC\uB86F")) detectedType = "\uC2AC\uB86F";
          else if (name.includes("\uBC14\uC774\uB7F4")) detectedType = "\uBC14\uC774\uB7F4";
          else if (name.includes("\uD0C0\uC9C0\uC5ED")) detectedType = "\uD0C0\uC9C0\uC5ED";
          return { name, rowCount: Math.max(0, data.length - 1), detectedType };
        });
        return res.json({ sheets: sheetList, needsSelection: true });
      }
      if (!workbook.SheetNames.includes(selectedSheet)) {
        return res.status(400).json({ error: `\uC2DC\uD2B8 '${selectedSheet}'\uC744(\uB97C) \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.` });
      }
      const sheetName = selectedSheet;
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (jsonData.length < 2) {
        return res.status(400).json({ error: "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const headers = jsonData[0].map((h) => String(h || "").trim());
      let sheetType = "\uC2AC\uB86F";
      if (headers.some((h) => h.includes("\uBC14\uC774\uB7F4")) || sheetName.includes("\uBC14\uC774\uB7F4")) {
        sheetType = "\uBC14\uC774\uB7F4";
      } else if (headers.some((h) => h.includes("\uC2AC\uB86F")) || sheetName.includes("\uC2AC\uB86F")) {
        sheetType = "\uC2AC\uB86F";
      } else if (sheetName.includes("\uD0C0\uC9C0\uC5ED")) {
        sheetType = "\uD0C0\uC9C0\uC5ED";
      }
      const slotMapping = {
        "\uB0A0\uC9DC": "contractDate",
        "\uC694\uCCAD": "customerName",
        "\uC2E0\uCCAD": "customerName",
        "\uC0AC\uC6A9\uC790": "userIdentifier",
        "\uB2F4\uB2F9\uC790": "managerName",
        "\uD488\uBA85": "productName",
        "\uC2AC\uB86F": "productName",
        "\uC0C1\uD488": "productName",
        "\uB2E8\uAC00": "unitPrice",
        "\uC77C\uC218": "days",
        "\uCD94\uAC00": "addQuantity",
        "\uC5F0\uC7A5": "extendQuantity",
        "\uC218\uB7C9": "quantity",
        "\uACB0\uC81C\uAE08\uC561": "cost",
        "\uCD1D\uAE08\uC561": "cost",
        "\uACF5\uAE09\uAC00\uC561": "supplyAmount",
        "\uACF5\uAE09\uAC00": "supplyAmount",
        "\uBD80\uAC00\uC138": "vatAmount",
        "\uC791\uC5C5\uBE44": "workCost",
        "\uC791\uC5C5\uC790": "workerName",
        "\uACC4\uC0B0\uC11C\uBC1C\uD589": "invoiceIssued",
        "\uACB0\uC81C\uD655\uC778": "paymentConfirmed",
        "\uBE44\uACE0": "notes"
      };
      const viralMapping = {
        "\uB0A0\uC9DC": "contractDate",
        "\uC694\uCCAD": "customerName",
        "\uC2E0\uCCAD\uC5C5\uCCB4": "customerName",
        "\uB2F4\uB2F9\uC790": "managerName",
        "\uC0C1\uD488": "productName",
        "\uD488\uBA85": "productName",
        "\uB2E8\uAC00": "unitPrice",
        "\uC77C\uC218": "days",
        "\uCD94\uAC00": "addQuantity",
        "\uC5F0\uC7A5": "extendQuantity",
        "\uC218\uB7C9": "quantity",
        "\uCD1D\uAE08\uC561": "cost",
        "\uACB0\uC81C\uAE08\uC561": "cost",
        "\uCD1D\uAE08\uC561(\uACF5\uAE09\uAC00)": "cost",
        "\uACF5\uAE09\uAC00\uC561": "supplyAmount",
        "\uACF5\uAE09\uAC00": "supplyAmount",
        "\uBD80\uAC00\uC138": "vatAmount",
        "\uC791\uC5C5\uBE44": "workCost",
        "\uC791\uC5C5\uC790": "workerName",
        "\uACC4\uC0B0\uC11C\uBC1C\uD589": "invoiceIssued",
        "\uACB0\uC81C\uD655\uC778": "paymentConfirmed",
        "\uBE44\uACE0": "notes"
      };
      const fieldMapping = sheetType === "\uBC14\uC774\uB7F4" ? viralMapping : slotMapping;
      const headerFieldMap = {};
      const usedFields = /* @__PURE__ */ new Set();
      headers.forEach((header, idx) => {
        if (fieldMapping[header] && !usedFields.has(fieldMapping[header])) {
          headerFieldMap[idx] = fieldMapping[header];
          usedFields.add(fieldMapping[header]);
          return;
        }
      });
      headers.forEach((header, idx) => {
        if (headerFieldMap[idx]) return;
        for (const [korKey, engField] of Object.entries(fieldMapping)) {
          if (!usedFields.has(engField) && header.startsWith(korKey)) {
            headerFieldMap[idx] = engField;
            usedFields.add(engField);
            break;
          }
        }
      });
      const costHeader = headers.find((_, idx) => headerFieldMap[idx] === "cost") || "";
      const costColumnIsSupplyAmount = sheetType === "\uBC14\uC774\uB7F4" || costHeader.includes("\uACF5\uAE09\uAC00");
      const parseExcelDate = (value, fallbackDate = null) => {
        const normalizeDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const safeFallback = fallbackDate instanceof Date && !isNaN(fallbackDate.getTime()) ? normalizeDateOnly(fallbackDate) : null;
        const resolveYear = (month) => {
          const base = safeFallback || /* @__PURE__ */ new Date();
          let year = base.getFullYear();
          if (safeFallback) {
            const prevMonth = safeFallback.getMonth() + 1;
            if (prevMonth === 12 && month === 1) year += 1;
          }
          return year;
        };
        if (value === null || value === void 0 || value === "") return safeFallback;
        if (value instanceof Date && !isNaN(value.getTime())) {
          return normalizeDateOnly(value);
        }
        if (typeof value === "number" && Number.isFinite(value)) {
          if (value > 1e3) {
            const dateCode = XLSX.SSF.parse_date_code(value);
            if (dateCode?.y && dateCode?.m && dateCode?.d) {
              return new Date(dateCode.y, dateCode.m - 1, dateCode.d);
            }
          } else if (value > 0) {
            let month = Math.floor(value);
            let day = Math.round((value - month) * 100);
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
              return new Date(resolveYear(month), month - 1, day);
            }
            const compact = Math.round(value);
            if (compact >= 101 && compact <= 1231) {
              month = Math.floor(compact / 100);
              day = compact % 100;
              if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                return new Date(resolveYear(month), month - 1, day);
              }
            }
          }
          return safeFallback;
        }
        if (typeof value === "string") {
          const text2 = value.trim();
          if (!text2) return safeFallback;
          const normalized = text2.replace(/[./]/g, "-").replace(/\s+/g, "");
          const ymd = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s.*)?$/);
          if (ymd) {
            return new Date(parseInt(ymd[1]), parseInt(ymd[2]) - 1, parseInt(ymd[3]));
          }
          const md = normalized.match(/^(\d{1,2})-(\d{1,2})$/);
          if (md) {
            const month = parseInt(md[1]);
            const day = parseInt(md[2]);
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
              return new Date(resolveYear(month), month - 1, day);
            }
          }
          const parsed = new Date(text2);
          if (!isNaN(parsed.getTime())) {
            return normalizeDateOnly(parsed);
          }
        }
        return safeFallback;
      };
      const stagingRows = [];
      let rowIndex = 0;
      let currentContractDate = null;
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        if (!row || row.length === 0 || row.every((cell) => !cell && cell !== 0)) continue;
        const mapped = {};
        for (const [colIdx, field] of Object.entries(headerFieldMap)) {
          const cellValue = row[parseInt(colIdx)];
          if (cellValue !== void 0 && cellValue !== null && cellValue !== "") {
            mapped[field] = cellValue;
          }
        }
        if (!mapped.customerName && !mapped.productName) continue;
        const contractDate = parseExcelDate(mapped.contractDate, currentContractDate);
        if (contractDate) currentContractDate = contractDate;
        const addQuantity = Math.max(0, parseBulkImportInteger(mapped.addQuantity, 0));
        const extendQuantity = Math.max(0, parseBulkImportInteger(mapped.extendQuantity, 0));
        const inferredQuantity = addQuantity + extendQuantity;
        const quantity = hasBulkImportCellValue(mapped.quantity) ? parseBulkImportInteger(mapped.quantity, 0) : inferredQuantity > 0 ? inferredQuantity : 1;
        const paymentConfirmed = mapped.paymentConfirmed ? String(mapped.paymentConfirmed) : null;
        const disbursementStatusFromSheet = mapped.disbursementStatus ? String(mapped.disbursementStatus) : null;
        const disbursementStatus = disbursementStatusFromSheet || paymentConfirmed;
        const unitPrice = parseBulkImportInteger(mapped.unitPrice, 0);
        const days = Math.max(0, parseBulkImportInteger(mapped.days, 0));
        const cost = parseBulkImportInteger(mapped.cost, 0);
        const workCost = Math.max(0, parseBulkImportInteger(mapped.workCost, 0));
        const explicitSupplyAmount = hasBulkImportCellValue(mapped.supplyAmount) ? parseBulkImportInteger(mapped.supplyAmount, 0) : null;
        const explicitVatAmount = hasBulkImportCellValue(mapped.vatAmount) ? parseBulkImportInteger(mapped.vatAmount, 0) : null;
        const invoiceIssuedFlag = parseInvoiceIssuedFlag(mapped.invoiceIssued ? String(mapped.invoiceIssued) : null);
        let supplyAmount = explicitSupplyAmount ?? 0;
        let vatAmount = explicitVatAmount ?? 0;
        if (explicitSupplyAmount === null && explicitVatAmount === null) {
          if (cost !== 0) {
            if (!costColumnIsSupplyAmount && invoiceIssuedFlag === true && cost > 0) {
              supplyAmount = Math.round(cost / 1.1);
              vatAmount = cost - supplyAmount;
            } else {
              supplyAmount = cost;
              vatAmount = invoiceIssuedFlag === true ? Math.round(supplyAmount * 0.1) : 0;
            }
          } else if (unitPrice !== 0) {
            supplyAmount = unitPrice * Math.max(1, quantity);
            vatAmount = invoiceIssuedFlag === true ? Math.round(supplyAmount * 0.1) : 0;
          }
        }
        const previewCost = cost !== 0 ? cost : supplyAmount + vatAmount;
        stagingRows.push({
          batchId: "",
          rowIndex: rowIndex++,
          rawData: JSON.stringify(Object.fromEntries(headers.map((h, idx) => [h, row[idx] ?? ""]))),
          contractDate,
          customerName: mapped.customerName ? String(mapped.customerName) : null,
          userIdentifier: mapped.userIdentifier ? String(mapped.userIdentifier) : null,
          managerName: mapped.managerName ? String(mapped.managerName) : null,
          productName: mapped.productName ? String(mapped.productName) : null,
          unitPrice,
          days,
          quantity: Math.max(1, quantity),
          cost: previewCost,
          workCost,
          workerName: mapped.workerName ? String(mapped.workerName) : null,
          supplyAmount,
          vatAmount,
          paymentConfirmed,
          invoiceIssued: mapped.invoiceIssued ? String(mapped.invoiceIssued) : null,
          disbursementStatus,
          notes: mapped.notes ? String(mapped.notes) : null,
          errors: null,
          isValid: true,
          isDuplicate: false
        });
      }
      const batch = await storage.createImportBatch({
        userId: currentUser.id,
        userName: currentUser.name,
        fileName: req.file.originalname,
        sheetName,
        sheetType,
        status: "pending",
        totalRows: stagingRows.length,
        validRows: 0,
        errorRows: 0,
        importedRows: 0,
        mappingConfig: JSON.stringify(fieldMapping),
        errorDetails: null,
        completedAt: null
      });
      const rowsWithBatchId = stagingRows.map((r) => ({ ...r, batchId: batch.id }));
      const createdRows = await storage.createImportStagingRows(rowsWithBatchId);
      await writeSystemLog(req, {
        actionType: "excel_upload",
        action: "\uC77C\uAD04\uB4F1\uB85D \uC5D1\uC140 \uC5C5\uB85C\uB4DC",
        details: `file=${req.file.originalname}, sheet=${sheetName}, sheetType=${sheetType}, rows=${stagingRows.length}`
      });
      res.json({
        batch,
        rows: createdRows,
        totalRows: stagingRows.length,
        sheetType,
        sheetName,
        headers
      });
    } catch (error) {
      console.error("Bulk import upload error:", error);
      res.status(500).json({ error: error.message || "\uD30C\uC77C \uC5C5\uB85C\uB4DC \uCC98\uB9AC \uC2E4\uD328" });
    }
  });
  app2.get("/api/bulk-import/batches", autoLoginDev, requireAuth, requireAdmin, async (_req, res) => {
    try {
      const batches = await storage.getImportBatches();
      res.json(batches);
    } catch (error) {
      console.error("Error fetching import batches:", error);
      res.status(500).json({ error: "\uBC30\uCE58 \uBAA9\uB85D \uC870\uD68C \uC2E4\uD328" });
    }
  });
  app2.get("/api/bulk-import/batches/:batchId", autoLoginDev, requireAuth, requireAdmin, async (req, res) => {
    try {
      const batchId = toSingleString(req.params.batchId);
      const batch = await storage.getImportBatch(batchId);
      if (!batch) {
        return res.status(404).json({ error: "\uBC30\uCE58\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const rows = await storage.getImportStagingRows(batchId);
      res.json({ batch, rows });
    } catch (error) {
      console.error("Error fetching import batch:", error);
      res.status(500).json({ error: "\uBC30\uCE58 \uC870\uD68C \uC2E4\uD328" });
    }
  });
  app2.post("/api/bulk-import/batches/:batchId/validate", autoLoginDev, requireAuth, requireAdmin, async (req, res) => {
    try {
      const batchId = toSingleString(req.params.batchId);
      const batch = await storage.getImportBatch(batchId);
      if (!batch) {
        return res.status(404).json({ error: "\uBC30\uCE58\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      const rows = await storage.getImportStagingRows(batchId);
      let validCount = 0;
      let errorCount = 0;
      const seen = /* @__PURE__ */ new Set();
      const updatedRows = [];
      const existingContracts = await storage.getContracts();
      const existingContractKeys = new Set(
        existingContracts.map((c) => {
          const dateStr = c.contractDate ? new Date(c.contractDate).toISOString().split("T")[0] : "";
          return `${c.customerName || ""}|${c.products || ""}|${c.userIdentifier || ""}|${dateStr}`;
        })
      );
      for (const row of rows) {
        const errors = [];
        if (!row.customerName || !row.customerName.trim()) {
          errors.push("\uACE0\uAC1D\uBA85 \uB204\uB77D");
        }
        if (!row.productName || !row.productName.trim()) {
          errors.push("\uC0C1\uD488\uBA85 \uB204\uB77D");
        }
        if (row.contractDate) {
          const d = new Date(row.contractDate);
          if (isNaN(d.getTime())) {
            errors.push("\uB0A0\uC9DC \uD615\uC2DD \uC624\uB958");
          }
        }
        const dupeKey = `${row.customerName || ""}|${row.productName || ""}|${row.userIdentifier || ""}|${row.contractDate ? new Date(row.contractDate).toISOString().split("T")[0] : ""}`;
        let isDuplicate = false;
        if (seen.has(dupeKey)) {
          isDuplicate = true;
          errors.push("\uBC30\uCE58 \uB0B4 \uC911\uBCF5 \uB370\uC774\uD130");
        }
        if (existingContractKeys.has(dupeKey)) {
          isDuplicate = true;
          errors.push("\uAE30\uC874 \uACC4\uC57D\uACFC \uC911\uBCF5");
        }
        seen.add(dupeKey);
        const isValid = errors.length === 0;
        if (isValid) validCount++;
        else errorCount++;
        updatedRows.push({ ...row, isValid, isDuplicate, errors: errors.length > 0 ? JSON.stringify(errors) : null });
      }
      await storage.deleteImportStagingRows(batchId);
      if (updatedRows.length > 0) {
        await storage.createImportStagingRows(updatedRows.map((r) => ({
          batchId: r.batchId,
          rowIndex: r.rowIndex,
          rawData: r.rawData,
          contractDate: r.contractDate,
          customerName: r.customerName,
          userIdentifier: r.userIdentifier,
          managerName: r.managerName,
          productName: r.productName,
          unitPrice: r.unitPrice,
          days: r.days,
          quantity: r.quantity,
          cost: r.cost,
          workCost: r.workCost,
          workerName: r.workerName,
          supplyAmount: r.supplyAmount,
          vatAmount: r.vatAmount,
          paymentConfirmed: r.paymentConfirmed,
          invoiceIssued: r.invoiceIssued,
          disbursementStatus: r.disbursementStatus,
          notes: r.notes,
          errors: r.errors,
          isValid: r.isValid,
          isDuplicate: r.isDuplicate
        })));
      }
      await storage.updateImportBatch(batchId, {
        status: "validated",
        validRows: validCount,
        errorRows: errorCount
      });
      const errorList = updatedRows.filter((r) => !r.isValid && r.errors).map((r) => ({
        rowIndex: r.rowIndex,
        errors: JSON.parse(r.errors)
      }));
      res.json({
        batch: await storage.getImportBatch(batchId),
        validCount,
        errorCount,
        totalRows: rows.length,
        errors: errorList,
        rows: updatedRows
      });
    } catch (error) {
      console.error("Validation error:", error);
      res.status(500).json({ error: error.message || "\uAC80\uC99D \uC2E4\uD328" });
    }
  });
  app2.post("/api/bulk-import/batches/:batchId/commit", autoLoginDev, requireAuth, requireAdmin, async (req, res) => {
    try {
      const batchId = toSingleString(req.params.batchId);
      const currentUser = await storage.getUser(req.session.userId);
      const batch = await storage.getImportBatch(batchId);
      if (!batch) {
        return res.status(404).json({ error: "\uBC30\uCE58\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      if (batch.status === "completed") {
        return res.status(400).json({ error: "\uC774\uBBF8 \uAC00\uC838\uC624\uAE30\uAC00 \uC644\uB8CC\uB41C \uBC30\uCE58\uC785\uB2C8\uB2E4." });
      }
      const rows = await storage.getImportStagingRows(batchId);
      const validRows = rows.filter((r) => r.isValid);
      let importedCount = 0;
      const commitErrors = [];
      const existingCustomers = await storage.getCustomers();
      const existingProducts = await storage.getProducts();
      const allUsers = await storage.getUsers();
      const customerMap = new Map(existingCustomers.map((c) => [c.name, c]));
      const productMap = new Map(existingProducts.map((p) => [p.name, p]));
      let importMappingConfig = {};
      try {
        importMappingConfig = JSON.parse(batch.mappingConfig || "{}");
      } catch {
        importMappingConfig = {};
      }
      const now = /* @__PURE__ */ new Date();
      const contractPrefix = `BI${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
      const isPaymentConfirmed = (val) => {
        const normalized = normalizeFlagText(val).replace(/\s+/g, "");
        if (!normalized) return false;
        const unconfirmedKeywords = [
          "\uBBF8\uD655\uC778",
          "\uBBF8\uC785\uAE08",
          "\uB300\uAE30",
          "\uCDE8\uC18C",
          "false",
          "0",
          "n",
          "no",
          "x"
        ];
        if (unconfirmedKeywords.some((keyword) => normalized.includes(keyword))) return false;
        return true;
      };
      for (const row of validRows) {
        try {
          await db.transaction(async (tx) => {
            let customer = customerMap.get(row.customerName || "");
            if (!customer && row.customerName) {
              const [createdCustomer] = await tx.insert(customers).values({
                name: row.customerName,
                status: "active",
                customerType: "\uACC4\uC57D\uC644\uB8CC",
                lifecycleStage: "customer"
              }).returning();
              customer = createdCustomer;
              customerMap.set(row.customerName, createdCustomer);
            }
            let product = productMap.get(row.productName || "");
            const rowVatType = vatTypeFromInvoiceIssued(row.invoiceIssued);
            if (!product && row.productName) {
              let category = batch.sheetType === "\uBC14\uC774\uB7F4" ? "\uBC14\uC774\uB7F4 \uC0C1\uD488" : "\uCFE0\uD321\uC2AC\uB86F";
              if (row.productName.startsWith("\uD0C0\uC9C0\uC5ED")) {
                category = "\uD0C0\uC9C0\uC5ED\uD300";
              }
              const [createdProduct] = await tx.insert(products).values({
                name: row.productName,
                category,
                unitPrice: row.unitPrice || 0,
                vatType: rowVatType || "\uBD80\uAC00\uC138\uBCC4\uB3C4",
                isActive: true
              }).returning();
              product = createdProduct;
              productMap.set(row.productName, createdProduct);
            } else if (product && rowVatType && product.vatType !== rowVatType) {
              const [updatedProduct] = await tx.update(products).set({ vatType: rowVatType }).where(eq2(products.id, product.id)).returning();
              if (updatedProduct) {
                product = updatedProduct;
                productMap.set(updatedProduct.name, updatedProduct);
              }
            }
            let supplyAmount = Number(row.supplyAmount) || 0;
            let vatAmount = Number(row.vatAmount) || 0;
            const uploadedCost = Number(row.cost) || 0;
            const rowDays = row.days ? Number(row.days) : 0;
            const addQuantity = 0;
            const extendQuantity = 0;
            const rowQuantity = Math.max(1, Number(row.quantity) || 1);
            if (supplyAmount === 0 && vatAmount === 0 && uploadedCost > 0) {
              supplyAmount = uploadedCost;
            }
            let workerName = row.workerName || null;
            let calculatedWorkCost = row.workCost || 0;
            const matchedProduct = row.productName ? productMap.get(row.productName) : null;
            if (matchedProduct) {
              if (!workerName && matchedProduct.worker) {
                workerName = matchedProduct.worker;
              }
              if (!calculatedWorkCost && matchedProduct.workCost && matchedProduct.baseDays && matchedProduct.baseDays > 0) {
                const dailyWorkCost = matchedProduct.workCost / matchedProduct.baseDays;
                calculatedWorkCost = Math.round(dailyWorkCost * rowDays * rowQuantity);
              }
            }
            const contractNumber = `${contractPrefix}-${String(importedCount + 1).padStart(4, "0")}`;
            const manager = row.managerName ? allUsers.find((u) => u.name === row.managerName) : null;
            const paymentStatusText = row.paymentConfirmed ? String(row.paymentConfirmed).trim() : null;
            const disbursementStatus = row.disbursementStatus ? String(row.disbursementStatus).trim() : paymentStatusText;
            const invoiceIssuedFlag = parseInvoiceIssuedFlag(row.invoiceIssued);
            const productDetailsVatType = invoiceIssuedFlag === true ? "\uD3EC\uD568" : "\uBBF8\uD3EC\uD568";
            if (supplyAmount === 0 && row.unitPrice) {
              supplyAmount = (Number(row.unitPrice) || 0) * rowQuantity;
            }
            if (vatAmount === 0 && invoiceIssuedFlag === true && supplyAmount > 0) {
              vatAmount = Math.round(supplyAmount * 0.1);
            }
            const contractCost = supplyAmount;
            const grossAmount = supplyAmount + vatAmount;
            const productDetails = row.productName ? [
              {
                id: "1",
                productName: row.productName,
                userIdentifier: row.userIdentifier || "",
                vatType: productDetailsVatType,
                unitPrice: Number(row.unitPrice) || 0,
                days: rowDays,
                addQuantity,
                extendQuantity,
                quantity: rowQuantity,
                baseDays: rowDays,
                worker: workerName || "",
                workCost: calculatedWorkCost,
                fixedWorkCostAmount: null,
                disbursementStatus,
                supplyAmount,
                grossSupplyAmount: grossAmount,
                refundAmount: null,
                negativeAdjustmentAmount: null,
                marginAmount: supplyAmount - calculatedWorkCost
              }
            ] : [];
            const [contract] = await tx.insert(contracts).values({
              contractNumber,
              contractDate: row.contractDate || now,
              contractName: null,
              managerId: manager?.id || null,
              managerName: row.managerName || "",
              customerId: customer?.id || null,
              customerName: row.customerName || "",
              products: row.productName || "",
              cost: contractCost,
              days: rowDays,
              quantity: rowQuantity,
              addQuantity,
              extendQuantity,
              paymentConfirmed: isPaymentConfirmed(row.paymentConfirmed),
              paymentMethod: paymentStatusText,
              invoiceIssued: row.invoiceIssued || null,
              worker: workerName,
              workCost: calculatedWorkCost,
              notes: row.notes || null,
              disbursementStatus,
              userIdentifier: row.userIdentifier || null,
              productDetailsJson: productDetails.length > 0 ? JSON.stringify(productDetails) : null
            }).returning();
            if (isPaymentConfirmed(row.paymentConfirmed)) {
              await tx.insert(payments).values({
                contractId: contract.id,
                depositDate: row.contractDate || now,
                customerName: row.customerName || "",
                manager: row.managerName || "",
                amount: grossAmount || uploadedCost || contractCost,
                depositConfirmed: true,
                paymentMethod: paymentStatusText,
                invoiceIssued: invoiceIssuedFlag === true,
                notes: `\uC77C\uAD04\uB4F1\uB85D- ${batch.fileName}`
              });
            }
          });
          importedCount++;
        } catch (rowError) {
          commitErrors.push(`\uD589 ${row.rowIndex + 1}: ${rowError.message}`);
        }
      }
      await storage.updateImportBatch(batchId, {
        status: "completed",
        importedRows: importedCount,
        completedAt: /* @__PURE__ */ new Date(),
        errorDetails: commitErrors.length > 0 ? JSON.stringify(commitErrors) : null
      });
      if (currentUser) {
        await storage.createSystemLog({
          userId: currentUser.id,
          loginId: currentUser.loginId,
          userName: currentUser.name,
          action: `\uC77C\uAD04\uB4F1\uB85D \uC644\uB8CC: ${batch.fileName} (${importedCount}\uAC74)`,
          actionType: "data_export",
          ipAddress: req.headers["x-forwarded-for"] || req.ip || "",
          userAgent: req.headers["user-agent"] || ""
        });
      }
      res.json({
        importedCount,
        totalValid: validRows.length,
        errors: commitErrors
      });
    } catch (error) {
      console.error("Commit error:", error);
      res.status(500).json({ error: error.message || "\uAC00\uC838\uC624\uAE30 \uC2E4\uD328" });
    }
  });
  app2.delete("/api/bulk-import/batches/:batchId", autoLoginDev, requireAuth, requireAdmin, async (req, res) => {
    try {
      const batchId = toSingleString(req.params.batchId);
      const batch = await storage.getImportBatch(batchId);
      if (!batch) {
        return res.status(404).json({ error: "\uBC30\uCE58\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
      }
      await storage.deleteImportBatch(batchId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting import batch:", error);
      res.status(500).json({ error: "\uBC30\uCE58 \uC0AD\uC81C \uC2E4\uD328" });
    }
  });
  app2.get("/api/bulk-import/template", async (_req, res) => {
    try {
      res.json({
        \uC2AC\uB86F: {
          headers: ["\uB0A0\uC9DC", "\uC694\uCCAD", "\uC0AC\uC6A9\uC790", "\uB2F4\uB2F9\uC790", "\uD488\uBA85", "\uB2E8\uAC00", "\uC77C\uC218", "\uC218\uB7C9", "\uACB0\uC81C\uAE08\uC561", "\uC791\uC5C5\uC790", "\uACC4\uC0B0\uC11C\uBC1C\uD589", "\uACB0\uC81C\uD655\uC778", "\uBE44\uACE0"]
        },
        \uBC14\uC774\uB7F4: {
          headers: ["\uB0A0\uC9DC", "\uC2E0\uCCAD\uC5C5\uCCB4", "\uB2F4\uB2F9\uC790", "\uC0C1\uD488", "\uB2E8\uAC00", "\uC77C\uC218", "\uC218\uB7C9", "\uCD1D\uAE08\uC561(\uACF5\uAE09\uAC00)", "\uC791\uC5C5\uC790", "\uACC4\uC0B0\uC11C\uBC1C\uD589", "\uACB0\uC81C\uD655\uC778", "\uBE44\uACE0"]
        }
      });
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ error: "\uD15C\uD50C\uB9BF \uC870\uD68C \uC2E4\uD328" });
    }
  });
  return httpServer2;
}

// server/static.ts
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function serveStatic(app2) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(
    express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
          return;
        }
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    })
  );
  app2.use("/{*path}", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import { createServer } from "http";

// server/seed.ts
import { eq as eq3, and as and2, sql as sql3 } from "drizzle-orm";
import bcrypt2 from "bcryptjs";
var BOOTSTRAP_ADMIN_ACCOUNTS_ENV = "SEED_ADMIN_ACCOUNTS_JSON";
function hashPassword(password) {
  return bcrypt2.hashSync(password, 10);
}
function parseBootstrapAdminAccounts() {
  const raw = String(process.env[BOOTSTRAP_ADMIN_ACCOUNTS_ENV] || "").trim();
  if (!raw) {
    return [];
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`${BOOTSTRAP_ADMIN_ACCOUNTS_ENV} must be valid JSON.`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`${BOOTSTRAP_ADMIN_ACCOUNTS_ENV} must be a JSON array.`);
  }
  return parsed.map((entry, index) => {
    if (!entry || typeof entry !== "object") {
      throw new Error(`${BOOTSTRAP_ADMIN_ACCOUNTS_ENV}[${index}] must be an object.`);
    }
    const account = entry;
    const loginId = String(account.loginId || "").trim();
    const password = String(account.password || "").trim();
    const name = String(account.name || "").trim();
    const role = String(account.role || "").trim();
    const department = String(account.department || "").trim();
    if (!loginId || !password || !name || !role || !department) {
      throw new Error(
        `${BOOTSTRAP_ADMIN_ACCOUNTS_ENV}[${index}] must include loginId, password, name, role, department.`
      );
    }
    return {
      loginId,
      password,
      name,
      role,
      department
    };
  });
}
async function seedAdminAccounts() {
  const adminAccounts = parseBootstrapAdminAccounts();
  if (adminAccounts.length === 0) {
    const existingUsers = await db.select({ id: users.id }).from(users).limit(1);
    if (existingUsers.length === 0) {
      console.warn(
        `[seed] no bootstrap admin accounts configured. Set ${BOOTSTRAP_ADMIN_ACCOUNTS_ENV} when initializing a blank database.`
      );
    }
    return;
  }
  for (const account of adminAccounts) {
    const existing = await db.select().from(users).where(eq3(users.loginId, account.loginId)).limit(1);
    if (existing.length > 0) {
      await db.update(users).set({
        password: hashPassword(account.password),
        name: account.name,
        role: account.role,
        department: account.department,
        isActive: true
      }).where(eq3(users.id, existing[0].id));
      console.log(`[seed] admin account updated: ${account.loginId}`);
      continue;
    }
    await db.insert(users).values({
      loginId: account.loginId,
      password: hashPassword(account.password),
      name: account.name,
      role: account.role,
      department: account.department,
      isActive: true,
      workStatus: "\uC7AC\uC9C1\uC911"
    });
    console.log(`[seed] admin account created: ${account.loginId}`);
  }
}
async function cleanupDummyData() {
  const dummyLoginIds = ["kim.chulsoo", "lee.younghee", "park.minsoo", "choi.donghyun"];
  for (const loginId of dummyLoginIds) {
    await db.delete(systemLogs).where(eq3(systemLogs.loginId, loginId));
  }
  const dummyNames = ["\uAE40\uCCA0\uC218", "\uC774\uC601\uD76C", "\uBC15\uBBFC\uC218", "\uC815\uC218\uC9C4", "\uCD5C\uB3D9\uD604"];
  for (const name of dummyNames) {
    const custs = await db.select({ id: customers.id }).from(customers).where(eq3(customers.name, name));
    for (const c of custs) {
      await db.delete(activities).where(eq3(activities.customerId, c.id));
      await db.delete(deals).where(eq3(deals.customerId, c.id));
      await db.delete(customers).where(eq3(customers.id, c.id));
    }
  }
  console.log("Dummy data cleanup completed.");
}
async function fixUnhashedPasswords() {
  const allUsers = await db.select().from(users);
  for (const user of allUsers) {
    if (user.password && !user.password.startsWith("$2b$") && !user.password.startsWith("$2a$")) {
      const hashed = hashPassword(user.password);
      await db.update(users).set({ password: hashed }).where(eq3(users.id, user.id));
      console.log(`Fixed unhashed password for user: ${user.loginId}`);
    }
  }
}
async function fixContractWorkCosts() {
  const zeroContracts = await db.select({ id: contracts.id, productName: contracts.products }).from(contracts).where(and2(eq3(contracts.days, 0), eq3(contracts.quantity, 0)));
  if (zeroContracts.length === 0) return;
  const allProducts = await db.select().from(products);
  const productMap = new Map(allProducts.map((p) => [p.name, p]));
  let updated = 0;
  const skipped = [];
  for (const contract of zeroContracts) {
    const product = productMap.get(contract.productName || "");
    if (!product || !product.baseDays || product.baseDays <= 0) {
      skipped.push(`${contract.id} (${contract.productName || "unknown"})`);
      continue;
    }
    const workerUnitCost = Number(product.workCost || 0);
    const computedWorkCost = Math.round(workerUnitCost / product.baseDays * product.baseDays);
    await db.update(contracts).set({ days: product.baseDays, quantity: 1, workCost: computedWorkCost }).where(eq3(contracts.id, contract.id));
    updated++;
  }
  if (updated > 0) {
    console.log(`Fixed work costs for ${updated} contracts.`);
  }
  if (skipped.length > 0) {
    console.warn(
      `Skipped ${skipped.length} contracts (no matching product): ${skipped.slice(0, 5).join(", ")}${skipped.length > 5 ? "..." : ""}`
    );
  }
}
async function ensureProductRateHistoryTable() {
  await db.execute(sql3`
    CREATE TABLE IF NOT EXISTS product_rate_histories (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      product_id varchar NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      product_name text NOT NULL,
      effective_from timestamp NOT NULL,
      unit_price integer NOT NULL DEFAULT 0,
      work_cost integer DEFAULT 0,
      base_days integer DEFAULT 0,
      vat_type text DEFAULT '부가세별도',
      worker text,
      changed_by text,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql3`
    CREATE INDEX IF NOT EXISTS idx_product_rate_histories_product_name_effective_from
    ON product_rate_histories(product_name, effective_from DESC)
  `);
  await db.execute(sql3`
    CREATE INDEX IF NOT EXISTS idx_product_rate_histories_product_id_effective_from
    ON product_rate_histories(product_id, effective_from DESC)
  `);
}
async function bootstrapProductRateHistories() {
  const [allProducts, existingHistories] = await Promise.all([
    db.select().from(products),
    db.select({ productId: productRateHistories.productId }).from(productRateHistories)
  ]);
  const existingProductIds = new Set(existingHistories.map((history) => history.productId));
  const now = /* @__PURE__ */ new Date();
  const missingHistories = allProducts.filter((product) => !existingProductIds.has(product.id)).map((product) => ({
    productId: product.id,
    productName: product.name,
    effectiveFrom: now,
    unitPrice: Number(product.unitPrice) || 0,
    workCost: Number(product.workCost) || 0,
    baseDays: Number(product.baseDays) || 0,
    vatType: product.vatType || "\uBD80\uAC00\uC138\uBCC4\uB3C4",
    worker: product.worker || null,
    changedBy: "system-bootstrap"
  }));
  if (missingHistories.length > 0) {
    await db.insert(productRateHistories).values(missingHistories);
    console.log(`Bootstrapped ${missingHistories.length} product rate history rows.`);
  }
}
async function seedDatabase() {
  await ensureProductRateHistoryTable();
  await bootstrapProductRateHistories();
  await seedAdminAccounts();
  await cleanupDummyData();
  await fixUnhashedPasswords();
  await fixContractWorkCosts();
  console.log("Database seed completed.");
}

// server/data-mapping-260606.ts
import fs2 from "node:fs/promises";
import path2 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var APPLY_SETTING_KEY = "data_mapping_260606_applied";
var LOCAL_DATA_LABEL = "260606_\uC784\uC2DC\uB370\uC774\uD130";
var SERVER_BACKUP_LABEL = "260606_\uBC31\uC5C5\uB370\uC774\uD130";
var TABLE_ALIASES = {
  users: "users",
  customers: "customers",
  contacts: "contacts",
  deals: "deals",
  dealTimelines: "deal_timelines",
  activities: "activities",
  payments: "payments",
  systemLogs: "system_logs",
  products: "products",
  productRateHistories: "product_rate_histories",
  contracts: "contracts",
  refunds: "refunds",
  keeps: "keeps",
  deposits: "deposits",
  notices: "notices",
  pagePermissions: "page_permissions",
  systemSettings: "system_settings",
  importBatches: "import_batches",
  importStagingRows: "import_staging_rows",
  importMappings: "import_mappings"
};
var BACKUP_TABLES = [
  "users",
  "customers",
  "contacts",
  "deals",
  "deal_timelines",
  "activities",
  "payments",
  "system_logs",
  "products",
  "product_rate_histories",
  "contracts",
  "refunds",
  "keeps",
  "deposits",
  "notices",
  "page_permissions",
  "system_settings",
  "import_batches",
  "import_staging_rows",
  "import_mappings"
];
var INSERT_ORDER = [
  "users",
  "customers",
  "contacts",
  "products",
  "product_rate_histories",
  "deals",
  "deal_timelines",
  "activities",
  "contracts",
  "payments",
  "deposits",
  "refunds",
  "keeps",
  "notices",
  "page_permissions",
  "system_settings",
  "system_logs",
  "import_batches",
  "import_staging_rows",
  "import_mappings"
];
function quoteIdentifier(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}
function toSnakeCase(key) {
  return String(key).replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[ -]+/g, "_").toLowerCase();
}
function normalizeTables(payload) {
  const raw = payload && typeof payload === "object" && "tables" in payload ? payload.tables : payload;
  if (!raw || typeof raw !== "object") return {};
  const tables = {};
  for (const [key, rows] of Object.entries(raw)) {
    if (!Array.isArray(rows)) continue;
    const tableName = TABLE_ALIASES[key] || toSnakeCase(key);
    if (tableName === "database_backups") continue;
    tables[tableName] = rows;
  }
  return tables;
}
function convertValueForColumn(value, udtName) {
  if (value === void 0) return null;
  if (value === null) return null;
  if ((udtName === "json" || udtName === "jsonb") && typeof value === "object") return JSON.stringify(value);
  return value;
}
async function getPublicTableNames(client) {
  const result = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);
  return result.rows.map((row) => String(row.table_name));
}
async function getTableMetadata(client, tableName) {
  const result = await client.query(
    `
      SELECT column_name, udt_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `,
    [tableName]
  );
  const columns = result.rows.map((row) => String(row.column_name));
  const typeByColumn = Object.fromEntries(
    result.rows.map((row) => [
      String(row.column_name),
      String(row.udt_name)
    ])
  );
  return { columns, typeByColumn };
}
function mapRowToColumns(row, knownColumns) {
  const mapped = {};
  const columnSet = new Set(knownColumns);
  if (!row || typeof row !== "object") return mapped;
  for (const [rawKey, rawValue] of Object.entries(row)) {
    if (rawKey === "__meta") continue;
    if (columnSet.has(rawKey)) {
      mapped[rawKey] = rawValue;
      continue;
    }
    const snake = toSnakeCase(rawKey);
    if (columnSet.has(snake)) mapped[snake] = rawValue;
  }
  return mapped;
}
async function insertRows(client, tableName, rawRows) {
  if (!rawRows.length) return 0;
  const { columns, typeByColumn } = await getTableMetadata(client, tableName);
  if (!columns.length) throw new Error(`Table not found or has no columns: ${tableName}`);
  const normalizedRows = rawRows.map((row) => mapRowToColumns(row, columns));
  const activeColumns = columns.filter((column) => normalizedRows.some((row) => Object.hasOwn(row, column)));
  if (!activeColumns.length) return 0;
  const batchSize = Math.min(1e3, Math.max(1, Math.floor(6e4 / activeColumns.length)));
  let inserted = 0;
  for (let offset = 0; offset < normalizedRows.length; offset += batchSize) {
    const batch = normalizedRows.slice(offset, offset + batchSize);
    const values = [];
    const placeholders = [];
    let paramIndex = 1;
    for (const row of batch) {
      const slot = [];
      for (const column of activeColumns) {
        values.push(convertValueForColumn(row[column], typeByColumn[column]));
        slot.push(`$${paramIndex}`);
        paramIndex += 1;
      }
      placeholders.push(`(${slot.join(",")})`);
    }
    await client.query(
      `
        INSERT INTO ${quoteIdentifier(tableName)} (${activeColumns.map(quoteIdentifier).join(",")})
        VALUES ${placeholders.join(",")}
      `,
      values
    );
    inserted += batch.length;
  }
  return inserted;
}
async function collectServerBackup(client) {
  const tables = {};
  const counts = {};
  for (const table of BACKUP_TABLES) {
    const result = await client.query(`SELECT * FROM ${quoteIdentifier(table)}`);
    tables[table] = result.rows;
    counts[table] = result.rows.length;
  }
  return {
    label: SERVER_BACKUP_LABEL,
    backupType: "json",
    backupVersion: 2,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    tables,
    counts
  };
}
async function writeServerBackup(client, backupPayload) {
  const data = JSON.stringify(backupPayload);
  await client.query(
    `
      INSERT INTO database_backups (label, created_by_name, created_by_user_id, table_counts, size_bytes, data)
      VALUES ($1, $2, NULL, $3, $4, $5)
    `,
    [
      SERVER_BACKUP_LABEL,
      "260606 \uC11C\uBC84 \uC790\uB3D9 \uBC31\uC5C5",
      JSON.stringify(backupPayload.counts || {}),
      Buffer.byteLength(data, "utf8"),
      data
    ]
  );
}
async function hasAppliedMarker(client) {
  const result = await client.query("SELECT setting_value FROM system_settings WHERE setting_key = $1 LIMIT 1", [
    APPLY_SETTING_KEY
  ]);
  return String(result.rows[0]?.setting_value || "") === "true";
}
async function writeAppliedMarker(client, summary) {
  await client.query(
    `
      INSERT INTO system_settings (setting_key, setting_value)
      VALUES ($1, $2)
      ON CONFLICT (setting_key) DO UPDATE SET setting_value = excluded.setting_value
    `,
    [APPLY_SETTING_KEY, "true"]
  );
  await client.query(
    `
      INSERT INTO system_settings (setting_key, setting_value)
      VALUES ($1, $2)
      ON CONFLICT (setting_key) DO UPDATE SET setting_value = excluded.setting_value
    `,
    [`${APPLY_SETTING_KEY}_summary`, JSON.stringify(summary)]
  );
}
async function loadLocalDataSnapshot() {
  const currentDir = path2.dirname(fileURLToPath2(import.meta.url));
  const candidates = [
    path2.resolve(currentDir, "../data-migrations/260606_\uC784\uC2DC\uB370\uC774\uD130.backup.json"),
    path2.resolve(process.cwd(), "data-migrations/260606_\uC784\uC2DC\uB370\uC774\uD130.backup.json")
  ];
  for (const candidate of candidates) {
    try {
      const raw = await fs2.readFile(candidate, "utf8");
      return { filePath: candidate, payload: JSON.parse(raw) };
    } catch {
    }
  }
  throw new Error("260606 temporary data snapshot file was not found.");
}
async function applyDataMapping260606IfNeeded() {
  const enabled = String(process.env.APPLY_260606_DATA_MAPPING || "true").trim().toLowerCase();
  if (["0", "false", "no", "off"].includes(enabled)) {
    console.log("[data-mapping-260606] skipped by APPLY_260606_DATA_MAPPING=false");
    return;
  }
  const client = await pool.connect();
  try {
    const publicTables = await getPublicTableNames(client);
    if (!publicTables.includes("system_settings") || !publicTables.includes("database_backups")) {
      console.log("[data-mapping-260606] skipped because required tables are not ready.");
      return;
    }
    if (await hasAppliedMarker(client)) {
      console.log("[data-mapping-260606] already applied.");
      return;
    }
    const { filePath, payload } = await loadLocalDataSnapshot();
    const tables = normalizeTables(payload);
    const tableNames = Object.keys(tables);
    const missingTables = tableNames.filter((tableName) => !publicTables.includes(tableName));
    if (missingTables.length) throw new Error(`Restore target is missing tables: ${missingTables.join(", ")}`);
    const restoreTableNames = tableNames.filter((tableName) => tableName !== "database_backups");
    const insertOrder = [
      ...INSERT_ORDER.filter((tableName) => restoreTableNames.includes(tableName)),
      ...restoreTableNames.filter((tableName) => !INSERT_ORDER.includes(tableName)).sort((a, b) => a.localeCompare(b))
    ];
    await client.query("BEGIN");
    await client.query("SET LOCAL lock_timeout = '15s'");
    await client.query("SET LOCAL statement_timeout = '0'");
    const serverBackup = await collectServerBackup(client);
    await writeServerBackup(client, serverBackup);
    await client.query(`TRUNCATE TABLE ${restoreTableNames.map(quoteIdentifier).join(", ")} RESTART IDENTITY CASCADE`);
    const restoredCounts = {};
    for (const tableName of insertOrder) {
      restoredCounts[tableName] = await insertRows(client, tableName, tables[tableName] || []);
    }
    const summary = {
      backupLabel: SERVER_BACKUP_LABEL,
      restoredLabel: LOCAL_DATA_LABEL,
      snapshotFile: filePath,
      restoredCounts,
      appliedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await writeAppliedMarker(client, summary);
    await client.query("COMMIT");
    console.log("[data-mapping-260606] applied", JSON.stringify(summary));
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {
    });
    console.error("[data-mapping-260606] failed:", error);
    throw error;
  } finally {
    client.release();
  }
}

// server/index.ts
var app = express2();
var httpServer = createServer(app);
app.use(
  express2.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express2.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/api/healthz", (_req, res) => {
  res.json({
    ok: true,
    service: "crm-api",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    uptimeSec: Math.round(process.uptime())
  });
});
var applicationReady = false;
app.get("/", (_req, res, next) => {
  if (applicationReady) {
    next();
    return;
  }
  res.type("text/plain").send("CRM Cafe24 Server is starting");
});
app.get("/api/readyz", async (_req, res) => {
  if (!hasDatabaseConfig) {
    res.status(503).json({
      ok: false,
      db: "disabled",
      message: "database connection is not configured",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    return;
  }
  try {
    await pool.query("SELECT 1");
    res.json({
      ok: true,
      db: "up",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      db: "down",
      message: "database connection failed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);
app.disable("x-powered-by");
var cachedMaxLoginAttempts = 10;
var settingsCacheTime = 0;
async function getMaxLoginAttempts() {
  const now = Date.now();
  if (now - settingsCacheTime > 6e4) {
    try {
      const setting = await storage.getSystemSetting("max_login_attempts");
      if (setting) cachedMaxLoginAttempts = parseInt(setting.settingValue) || 10;
      settingsCacheTime = now;
    } catch {
    }
  }
  return cachedMaxLoginAttempts;
}
var loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  max: async () => await getMaxLoginAttempts(),
  message: { error: "\uB85C\uADF8\uC778 \uC2DC\uB3C4\uAC00 \uB108\uBB34 \uB9CE\uC2B5\uB2C8\uB2E4. 15\uBD84 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, ip: false }
});
var apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1e3,
  max: 200,
  message: { error: "\uC694\uCCAD\uC774 \uB108\uBB34 \uB9CE\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, ip: false }
});
app.use("/api/", apiLimiter);
var PgSession = connectPgSimple(session);
var runtimeNodeEnv = (process.env.NODE_ENV || "production").toLowerCase();
var isProduction = runtimeNodeEnv === "production";
var configuredSessionSecret = (process.env.SESSION_SECRET || "").trim();
var resolvedSessionSecret = configuredSessionSecret || (process.env.PII_ENCRYPTION_KEY || "").trim() || (process.env.BACKUP_ENCRYPTION_KEY || "").trim();
function parseBooleanEnv(value) {
  const normalized = (value || "").trim().toLowerCase();
  if (!normalized) return void 0;
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  return void 0;
}
function resolveTrustProxyValue(rawValue) {
  const trimmed = (rawValue || "").trim();
  if (!trimmed) return isProduction ? 1 : false;
  const boolValue = parseBooleanEnv(trimmed);
  if (boolValue !== void 0) return boolValue ? 1 : false;
  const parsed = Number.parseInt(trimmed, 10);
  if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  return trimmed;
}
function resolveCookieSecure(rawValue) {
  const normalized = (rawValue || "").trim().toLowerCase();
  if (!normalized) return isProduction ? "auto" : false;
  if (normalized === "auto") return "auto";
  const boolValue = parseBooleanEnv(normalized);
  if (boolValue !== void 0) return boolValue;
  return isProduction ? "auto" : false;
}
function resolveCookieSameSite(rawValue) {
  const normalized = (rawValue || "").trim().toLowerCase();
  if (normalized === "strict" || normalized === "none" || normalized === "lax") return normalized;
  return "lax";
}
function shouldSeedOnBoot() {
  const explicit = parseBooleanEnv(process.env.SEED_ON_BOOT);
  if (explicit !== void 0) return explicit;
  return !isProduction;
}
var SESSION_TIMEOUT_DEFAULT_MIN = 5;
var SESSION_TIMEOUT_DEFAULT_MAX = 24 * 60;
function clampSessionTimeoutMinutes(value) {
  if (!Number.isFinite(value)) return 30;
  if (value < SESSION_TIMEOUT_DEFAULT_MIN) return SESSION_TIMEOUT_DEFAULT_MIN;
  if (value > SESSION_TIMEOUT_DEFAULT_MAX) return SESSION_TIMEOUT_DEFAULT_MAX;
  return Math.floor(value);
}
var trustProxyValue = resolveTrustProxyValue(process.env.TRUST_PROXY);
if (trustProxyValue !== false) {
  app.set("trust proxy", trustProxyValue);
}
if (isProduction && !resolvedSessionSecret) {
  throw new Error("SESSION_SECRET must be set in production.");
}
assertPiiEncryptionReadyForProduction();
var sessionCookieName = (process.env.SESSION_COOKIE_NAME || "crm.sid").trim() || "crm.sid";
var sessionCookieSecure = resolveCookieSecure(process.env.SESSION_COOKIE_SECURE);
var sessionCookieSameSite = resolveCookieSameSite(process.env.SESSION_COOKIE_SAMESITE);
var sessionCookieDomain = (process.env.SESSION_COOKIE_DOMAIN || "").trim() || void 0;
var defaultSessionTimeoutMinutes = clampSessionTimeoutMinutes(
  Number.parseInt(process.env.SESSION_TIMEOUT_DEFAULT_MINUTES || "30", 10)
);
var sessionPruneInterval = Math.max(
  60,
  Number.parseInt(process.env.SESSION_PRUNE_INTERVAL_SECONDS || "900", 10) || 900
);
app.use(
  session({
    name: sessionCookieName,
    store: hasDatabaseConfig ? new PgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
      pruneSessionInterval: sessionPruneInterval
    }) : void 0,
    secret: resolvedSessionSecret || "crm-dev-session-secret",
    resave: false,
    saveUninitialized: false,
    proxy: trustProxyValue !== false,
    rolling: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1e3,
      httpOnly: true,
      secure: sessionCookieSecure,
      sameSite: sessionCookieSameSite,
      domain: sessionCookieDomain
    }
  })
);
var cachedSessionTimeout = defaultSessionTimeoutMinutes;
var sessionTimeoutCacheTime = 0;
app.use(async (req, _res, next) => {
  if (req.session && req.session.cookie) {
    const now = Date.now();
    if (now - sessionTimeoutCacheTime > 6e4) {
      try {
        const setting = await storage.getSystemSetting("session_timeout");
        if (setting) {
          cachedSessionTimeout = clampSessionTimeoutMinutes(parseInt(setting.settingValue, 10));
        }
        sessionTimeoutCacheTime = now;
      } catch {
      }
    }
    req.session.cookie.maxAge = cachedSessionTimeout * 60 * 1e3;
  }
  next();
});
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
function maskName(value) {
  const chars = Array.from(String(value || "").trim());
  if (chars.length === 0) return "";
  if (chars.length === 1) return "*";
  if (chars.length === 2) return `${chars[0]}*`;
  return `${chars[0]}${"*".repeat(chars.length - 2)}${chars[chars.length - 1]}`;
}
function maskEmail(value) {
  const text2 = String(value || "").trim();
  const atIndex = text2.indexOf("@");
  if (atIndex <= 1) return "***";
  return `${text2.slice(0, 1)}***${text2.slice(atIndex)}`;
}
function maskPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length <= 4) return "*".repeat(digits.length || 1);
  return `${digits.slice(0, 3)}****${digits.slice(-4)}`;
}
function maskIdentifier(value) {
  const text2 = String(value || "").trim();
  if (text2.length <= 4) return "*".repeat(text2.length || 1);
  return `${"*".repeat(Math.max(0, text2.length - 4))}${text2.slice(-4)}`;
}
function maskIpAddress(value) {
  const text2 = String(value || "").trim();
  if (text2.includes(".")) {
    const parts = text2.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.*.*`;
    }
  }
  if (text2.includes(":")) {
    const parts = text2.split(":").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts.slice(0, 2).join(":")}::*`;
    }
  }
  return "***";
}
function maskAddress(value) {
  const text2 = String(value || "").trim();
  if (!text2) return "";
  return `${text2.slice(0, Math.min(6, text2.length))}...`;
}
function summarizeText(value) {
  const text2 = String(value || "").trim();
  if (!text2) return "";
  return `[REDACTED_TEXT:${text2.length}]`;
}
function sanitizeApiLogValue(value, key = "") {
  if (value === null || value === void 0) return value;
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeApiLogValue(item, key));
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        sanitizeApiLogValue(childValue, childKey)
      ])
    );
  }
  if (typeof value !== "string") {
    return value;
  }
  const normalizedKey = key.replace(/[^a-z0-9]/gi, "").toLowerCase();
  if (["password", "sessionid", "secret", "token", "authorization", "cookie", "userdata", "rawdata", "filedata"].includes(
    normalizedKey
  )) {
    return "[REDACTED]";
  }
  if (normalizedKey.includes("email")) return maskEmail(value);
  if (normalizedKey.includes("phone") || normalizedKey.includes("fax") || normalizedKey.endsWith("tel")) {
    return maskPhone(value);
  }
  if (normalizedKey.includes("ipaddress")) return maskIpAddress(value);
  if (normalizedKey.includes("address")) return maskAddress(value);
  if (normalizedKey === "loginid" || normalizedKey === "userid" || normalizedKey.endsWith("userid")) {
    return maskIdentifier(value);
  }
  if (normalizedKey.includes("account") || normalizedKey.includes("businessnumber")) return maskIdentifier(value);
  if (normalizedKey.includes("customername") || normalizedKey.includes("username") || normalizedKey.includes("authorname") || normalizedKey.includes("depositorname") || normalizedKey.includes("createdbyname") || normalizedKey === "name") {
    return maskName(value);
  }
  if (normalizedKey.includes("content") || normalizedKey.includes("description") || normalizedKey.includes("notes") || normalizedKey.includes("details")) {
    return summarizeText(value);
  }
  return value;
}
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        const sanitized = sanitizeApiLogValue(capturedJsonResponse);
        const logStr = JSON.stringify(sanitized);
        if (logStr.length > 500) {
          logLine += ` :: ${logStr.substring(0, 500)}...[truncated]`;
        } else {
          logLine += ` :: ${logStr}`;
        }
      }
      log(logLine);
    }
  });
  next();
});
async function bootstrapApplication() {
  await ensureDatabasePerformanceObjects();
  await registerRoutes(httpServer, app);
  try {
    if (shouldSeedOnBoot()) {
      await seedDatabase();
    } else {
      log("database seed skipped on boot");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
  try {
    if (hasDatabaseConfig) {
      await applyDataMapping260606IfNeeded();
    }
  } catch (error) {
    console.error("Error applying 260606 data mapping:", error);
  }
  app.use((err, _req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) {
      return next(err);
    }
    return res.status(status).json({ message });
  });
  if (isProduction) {
    const shouldServeStatic = process.env.SERVE_STATIC !== "false";
    if (shouldServeStatic) {
      serveStatic(app);
    } else {
      log("static serving is disabled (SERVE_STATIC=false)");
    }
  } else {
    const { setupVite: setupVite2 } = await init_vite().then(() => vite_exports);
    await setupVite2(httpServer, app);
  }
  applicationReady = true;
  log("application bootstrap completed");
}
var port = parseInt(process.env.PORT || "3000", 10);
httpServer.listen(
  {
    port,
    host: "0.0.0.0"
  },
  () => {
    log(`serving on port ${port}`);
    void bootstrapApplication().catch((error) => {
      console.error("Application bootstrap failed:", error);
    });
  }
);
export {
  log
};

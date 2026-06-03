# JARVIS Verify: Contracts Sticky Rows

## 1) Verification Target
- Workspace: `D:\CodexProjects\crm`
- Page: `http://127.0.0.1:5001/contracts`
- Scope: contract list sticky toolbar and sticky table header while scrolling.

## 2) Scenario
- Open the contracts page at desktop viewport `1440x900`.
- Verify the contract toolbar stays fixed at the top of the app scroll area.
- Scroll the contract table body vertically.
- Verify the table column header remains fixed at the top of the table viewport.
- Select one row and verify the selection summary remains in the fixed toolbar.

## 3) Result
- TypeScript check: PASS
- Production build: PASS
- Whitespace diff check: PASS
- Browser console errors: PASS, 0
- Sticky toolbar: PASS
- Sticky table header: PASS
- Horizontal overflow: PASS, false

## 4) Evidence
- Table scroll screenshot: `D:\CodexProjects\crm\.runtime\verification\contracts-sticky-table-scroll.png`
- Table scroll report: `D:\CodexProjects\crm\.runtime\verification\contracts-sticky-table-scroll-report.json`
- Selected summary screenshot: `D:\CodexProjects\crm\.runtime\verification\contracts-sticky-selected-summary.png`
- Selected summary report: `D:\CodexProjects\crm\.runtime\verification\contracts-sticky-selected-summary-report.json`

## 5) Key Measurements
- Toolbar top remained `61px` before and after table scroll.
- Table scroller top remained `259px`.
- Table header top remained `259px` after `tableScrollTop=420`.
- Header computed position was `sticky`.
- Table scroller overflow-y was `auto`.

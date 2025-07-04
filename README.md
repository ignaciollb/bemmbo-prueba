# Recruiting Frontend Test

This project is a technical test for Bemmbo, featuring a modern React + TypeScript frontend for managing and injecting invoices. It demonstrates best practices in UI/UX, code organization, and API integration.

## Features

- **Invoice List Table**: Paginated, filterable, and selectable invoice list with status icons.
- **Filtering**: Filter invoices by name, currency (multi-select), and injection status (multi-select).
- **Select All**: Select all non-injected invoices across all pages.
- **Batch Injection**: Inject selected invoices in batches of 25, with retry logic for server errors.
- **Confirmation Modal**: Before injecting, users see a modal to review and confirm the operation, with pagination for large selections.
- **Mock API Support**: Use mock data for local development/testing.

## Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
VITE_BEMMBO_BASE_URL=your_base_url_here
VITE_AUTH_TOKEN=your_api_token_here
VITE_MOCK_API=false # set to true to use mock data
```

- `VITE_BEMMBO_BASE_URL`: The base URL for the Bemmbo API.
- `VITE_AUTH_TOKEN`: Your authentication token for API requests.
- `VITE_MOCK_API`: Set to `true` to use mock data instead of real API calls.

### 3. Run the App

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

- `src/InvoicesList.tsx` — Main page and logic
- `src/components/InvoicesTable.tsx` — Table and selection logic
- `src/components/FilterBar.tsx` — Filtering UI
- `src/components/InjectConfirmationModal.tsx` — Confirmation modal
- `src/api/bemmboApi.ts` — API integration
- `src/models/invoice.ts` — Invoice type definition
- `src/mocks/invoices.ts` — Mock data

# Preproute Test Management

React + TypeScript implementation of the 5-page test management assignment.

## Stack
- React + TypeScript + Vite
- React Router
- Zustand for auth/draft state
- React Hook Form + Zod validation
- Axios API client
- Lucide icons

## Run
```bash
npm install
cp .env.example .env
npm run dev
```

The default API base URL is the staging API supplied in the assignment. You can override it with `VITE_API_BASE_URL`.

## Routes
- `/login`
- `/dashboard`
- `/tests/new`
- `/tests/:id/edit`
- `/tests/:id/questions`
- `/tests/:id/preview`

## API behavior
JWT is stored in localStorage and automatically attached as `Authorization: Bearer <token>` by the Axios interceptor. A 401 clears the session and redirects to login.

The documented endpoints are implemented for login, catalog data, tests, bulk question creation, bulk question fetch and publishing. Delete/update question calls are included as compatibility methods for backends that expose those conventional REST routes; the assignment's supplied API documentation does not document those two routes.

## Test credentials
Use the credentials supplied in the assignment email rather than committing them into application source.

## Notes
- The UI is responsive and designed as an original dashboard around the provided flow.
- Draft state is retained in Zustand while moving through the create/edit/question/preview flow.
- Existing question editing is handled in the question editor; unsaved questions are bulk-created when continuing.

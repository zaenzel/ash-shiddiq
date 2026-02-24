/**
 * Example Domain Public API
 *
 * Export all public interfaces for this domain.
 * Components outside this domain should import from here.
 */

export { AuthForm } from "./components/AuthForm";
export { AuthInitializer } from "./components/AuthInitializer";
export { ProtectedRoute } from "./components/ProtectedRoute";

export { createUser, loginUser, logoutUser } from "./services/user.api";

export { useAuthListener } from "./hooks/useAuthListener";
export { useAuth } from "./hooks/useAuth";
export { useLogin } from "./hooks/useLogin";
export { useLogout } from "./hooks/useLogout";

export { useAuthStore } from "./store/auth.store";

export type {
  ExampleItem,
  CreateExampleItemDto,
  UpdateExampleItemDto,
} from "./types/example.types";

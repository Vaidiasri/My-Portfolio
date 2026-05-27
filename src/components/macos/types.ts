export type AppId = "about" | "terminal" | "projects" | "experience" | "contact";

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

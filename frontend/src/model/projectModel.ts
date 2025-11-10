export interface UIComponent {
  id: string;
  type: "Button" | "Input" | "Label";
  x: number;
  y: number;
  props: Record<string, any>;
  events?: Record<string, string>;
}

export interface ProjectModel {
  components: UIComponent[];
}

export const defaultModel: ProjectModel = {
  components: [],
};

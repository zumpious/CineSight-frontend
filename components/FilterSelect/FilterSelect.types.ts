export interface FilterSelectProps<T> {
  label: string;
  id: string;
  value: T | null;
  onChange: (value: T | null) => void;
  options: T[];
  allLabel: string;
}
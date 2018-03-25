export interface Report {
  name: string
  filter?: Filter
};

interface Filter {
  column: string,
  operator: string,
  value: string
};
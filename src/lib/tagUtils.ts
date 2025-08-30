export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export const colorMap: Record<ChipColor, string> = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-purple-100 text-purple-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
};

export const getTagColor = (tag: string): ChipColor => {
  const colors: ChipColor[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
  const hash = tag?.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};

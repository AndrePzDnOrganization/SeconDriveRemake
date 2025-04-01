export {};

declare global {
  interface ProductCardProps {
    children: React.ReactNode;
    id: string;
    image: string;
    price: number;
    discount: number;
    alt: string;
    stock: number;
  }

  type CheckboxPriceProps = {
    valuePrice: string;
    checked: boolean;
    onToggle: () => void;
  };

  interface CartProductCardProps {
    children: React.ReactNode;
    id: number;
    image: string;
    price: number;
    discount: number;
    alt: string;
    stock: number;
    initialValue?: number;
    remove: () => void;
  }

  type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    discount: number;
    stock: number;
    quantity: number;
  };

  interface ProductQuantity {
    id: string;
    quantity: number;
  }

  interface NumericInputProps {
    max: number;
    onChange: (value: number) => void;
    onError: (error: string) => void;
    initialValue?: number;
  }

  interface InputProps {
    children: React.ReactNode;
    inputText?: string;
    className?: string;
    maxLength?: number;
    onChange: (value: string) => void;
  }

  interface DropDownProps {
    children: React.ReactNode;
    items: string[];
    regex?: RegExp;
    inputText?: string;
    className?: string;
    onSelect?: (selectedItem: string) => void;
    defaultItem: string;
  }

  interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    streetAddress: string;
    building: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  }
}

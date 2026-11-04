interface Author {
  id: string;
  name: string;
  username: string;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export interface AuthFormProps {
  mode: "login" | "register";
}

export interface FormProps {
  onPostCreated?: (newPost: Post) => void;
}

export interface FeedProps {
  posts: Post[];
  loading?: boolean;
}

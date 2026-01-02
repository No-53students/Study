"use client";

import {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
  ReactNode,
} from "react";

// ============================================
// 示例 1: 基本的 Context 用法
// ============================================

const UserContext = createContext<{ name: string; role: string } | null>(null);

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

function UserCard() {
  const user = useUser();
  return (
    <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <div className="mb-2 text-3xl">👤</div>
      <p className="font-semibold">{user.name}</p>
      <p className="text-sm text-zinc-500">{user.role}</p>
    </div>
  );
}

function UserGreeting() {
  const user = useUser();
  return (
    <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
      <p className="text-blue-800 dark:text-blue-200">
        欢迎回来，<strong>{user.name}</strong>！
      </p>
    </div>
  );
}

export function BasicContextExample() {
  const [user, setUser] = useState({ name: "张三", role: "管理员" });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本用法</h3>

      <div className="mb-4">
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser((u) => ({ ...u, name: e.target.value }))}
          className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          placeholder="输入用户名"
        />
      </div>

      <UserContext.Provider value={user}>
        <div className="grid gap-4 sm:grid-cols-2">
          <UserCard />
          <UserGreeting />
        </div>
      </UserContext.Provider>

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`const UserContext = createContext(null);

// 提供数据
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>

// 消费数据
function Component() {
  const user = useContext(UserContext);
  return <p>{user.name}</p>;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 主题切换
// ============================================

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function ThemedCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`rounded-lg p-4 transition-colors ${
        theme === "dark"
          ? "bg-zinc-800 text-white"
          : "bg-white text-zinc-800 shadow"
      }`}
    >
      <h4 className="font-semibold">主题卡片</h4>
      <p className="text-sm opacity-70">当前主题：{theme}</p>
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`rounded-md px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
        theme === "dark"
          ? "bg-yellow-500 text-black hover:bg-yellow-400"
          : "bg-zinc-800 text-white hover:bg-zinc-700"
      }`}
    >
      {theme === "dark" ? "🌞 切换到亮色" : "🌙 切换到暗色"}
    </button>
  );
}

export function ThemeContextExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 主题切换</h3>

      <ThemeProvider>
        <div className="mb-4 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
          <div className="mb-4 flex items-center justify-between">
            <ThemedCard />
            <ThemeToggleButton />
          </div>
        </div>
      </ThemeProvider>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t =>
    t === 'light' ? 'dark' : 'light'
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: Context + useReducer
// ============================================

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((i) => i.id === action.payload.id);
      if (existingItem) {
        const items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      }
      const items = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload);
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }
    case "UPDATE_QUANTITY": {
      const items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }
    case "CLEAR_CART":
      return { items: [], total: 0 };
    default:
      return state;
  }
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const products = [
  { id: 1, name: "React 入门", price: 49 },
  { id: 2, name: "TypeScript 精通", price: 69 },
  { id: 3, name: "Next.js 实战", price: 89 },
];

function ProductList() {
  const { dispatch } = useCart();

  return (
    <div className="space-y-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800"
        >
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-zinc-500">¥{product.price}</p>
          </div>
          <button
            onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            添加
          </button>
        </div>
      ))}
    </div>
  );
}

function CartSummary() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="rounded-lg bg-zinc-100 p-4 text-center text-zinc-500 dark:bg-zinc-800">
        购物车为空
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <h4 className="mb-3 font-semibold">购物车</h4>
      <div className="space-y-2">
        {state.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span>
              {item.name} x {item.quantity}
            </span>
            <div className="flex items-center gap-2">
              <span>¥{item.price * item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: item.id })
                }
                className="text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-700">
        <span className="font-semibold">总计：¥{state.total}</span>
        <button
          onClick={() => dispatch({ type: "CLEAR_CART" })}
          className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          清空购物车
        </button>
      </div>
    </div>
  );
}

export function ReducerContextExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: Context + useReducer</h3>

      <CartProvider>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-medium">商品列表</h4>
            <ProductList />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">购物车</h4>
            <CartSummary />
          </div>
        </div>
      </CartProvider>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>优势：</strong> useReducer + Context
        适合管理复杂状态逻辑，状态更新集中在 reducer 中处理。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 多层 Context
// ============================================

const LanguageContext = createContext<{
  language: "zh" | "en";
  setLanguage: (lang: "zh" | "en") => void;
}>({
  language: "zh",
  setLanguage: () => {},
});

const AuthContext = createContext<{
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const texts = {
    zh: { welcome: "欢迎", login: "登录", logout: "退出" },
    en: { welcome: "Welcome", login: "Login", logout: "Logout" },
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <span>{texts[language].welcome}!</span>
      <div className="flex gap-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "zh" | "en")}
          className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700"
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
        <button
          onClick={isLoggedIn ? logout : login}
          className={`rounded px-3 py-1 text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 ${
            isLoggedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoggedIn ? texts[language].logout : texts[language].login}
        </button>
      </div>
    </div>
  );
}

function Content() {
  const { language } = useContext(LanguageContext);
  const { isLoggedIn } = useContext(AuthContext);

  const texts = {
    zh: {
      loggedIn: "您已登录，可以访问所有内容",
      loggedOut: "请登录以查看更多内容",
    },
    en: {
      loggedIn: "You are logged in with full access",
      loggedOut: "Please login to see more content",
    },
  };

  return (
    <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
      <p>{isLoggedIn ? texts[language].loggedIn : texts[language].loggedOut}</p>
    </div>
  );
}

export function MultipleContextExample() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 多层 Context</h3>

      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AuthContext.Provider
          value={{
            isLoggedIn,
            login: () => setIsLoggedIn(true),
            logout: () => setIsLoggedIn(false),
          }}
        >
          <div className="space-y-4">
            <Header />
            <Content />
          </div>
        </AuthContext.Provider>
      </LanguageContext.Provider>

      <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`<LanguageContext.Provider value={language}>
  <AuthContext.Provider value={auth}>
    <App />
  </AuthContext.Provider>
</LanguageContext.Provider>`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 避免 Prop Drilling
// ============================================

interface DeepUser {
  name: string;
  avatar: string;
}

const DeepUserContext = createContext<DeepUser | null>(null);

// 模拟深层嵌套组件
function Level1({ children }: { children: ReactNode }) {
  return (
    <div className="rounded border-2 border-dashed border-blue-300 p-3 dark:border-blue-700">
      <p className="mb-2 text-xs text-blue-500">Level 1</p>
      {children}
    </div>
  );
}

function Level2({ children }: { children: ReactNode }) {
  return (
    <div className="rounded border-2 border-dashed border-green-300 p-3 dark:border-green-700">
      <p className="mb-2 text-xs text-green-500">Level 2</p>
      {children}
    </div>
  );
}

function Level3({ children }: { children: ReactNode }) {
  return (
    <div className="rounded border-2 border-dashed border-purple-300 p-3 dark:border-purple-700">
      <p className="mb-2 text-xs text-purple-500">Level 3</p>
      {children}
    </div>
  );
}

function DeepComponent() {
  const user = useContext(DeepUserContext);
  return (
    <div className="flex items-center gap-2 rounded bg-zinc-100 p-3 dark:bg-zinc-800">
      <span className="text-2xl">{user?.avatar}</span>
      <span className="font-medium">{user?.name}</span>
      <span className="text-xs text-zinc-500">（深层组件直接访问）</span>
    </div>
  );
}

export function PropDrillingExample() {
  const [user] = useState<DeepUser>({ name: "张三", avatar: "👤" });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 避免 Prop Drilling</h3>

      <DeepUserContext.Provider value={user}>
        <Level1>
          <Level2>
            <Level3>
              <DeepComponent />
            </Level3>
          </Level2>
        </Level1>
      </DeepUserContext.Provider>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>优势：</strong> 深层嵌套的组件可以直接通过 Context
        访问数据，无需逐层传递 props。中间的 Level1、Level2、Level3
        组件完全不需要知道 user 的存在。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ContextExamples() {
  return (
    <div className="space-y-6">
      <BasicContextExample />
      <ThemeContextExample />
      <ReducerContextExample />
      <MultipleContextExample />
      <PropDrillingExample />
    </div>
  );
}

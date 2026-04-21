import React from 'react'
import {
  // Navigation & UI
  Home,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Settings,
  User,
  Users,
  LogOut,

  // Business & Analytics
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Receipt,
  Package,
  Truck,
  Calendar,
  Clock,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Database,
  Server,
  Globe,
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,

  // Actions
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Share,
  Copy,
  RefreshCw,
  MoreHorizontal,
  MoreVertical,

  // Status
  Check,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Star,
  Heart,
  Bookmark,
  Flag,

  // Social & Communication
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  UserPlus,
  UserMinus,

  // Content & Media
  Image,
  Video,
  Music,
  File,
  Folder,
  Camera,
  Mic,
  Speaker,

  // Development & Tools
  Code,
  Terminal,
  Zap,
  Wrench,
  Hammer,
  Palette,
  Layers,
  Grid,
  Layout,

  // Nature & Environment
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Leaf,
  TreePine,
  Mountain,

  LucideIcon
} from 'lucide-react'

// Icon type for better TypeScript support
export type IconType = LucideIcon

// Icon categories for organization
export const iconCategories = {
  navigation: {
    home: Home,
    menu: Menu,
    close: X,
    back: ChevronLeft,
    forward: ChevronRight,
    up: ChevronUp,
    down: ChevronDown,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    arrowDown: ArrowDown
  },

  search: {
    search: Search,
    filter: Filter
  },

  user: {
    user: User,
    users: Users,
    userPlus: UserPlus,
    userMinus: UserMinus,
    logOut: LogOut
  },

  business: {
    chart: BarChart3,
    pieChart: PieChart,
    trendingUp: TrendingUp,
    trendingDown: TrendingDown,
    activity: Activity,
    target: Target,
    dollar: DollarSign,
    cart: ShoppingCart,
    creditCard: CreditCard,
    receipt: Receipt,
    package: Package,
    truck: Truck
  },

  time: {
    calendar: Calendar,
    clock: Clock
  },

  communication: {
    bell: Bell,
    mail: Mail,
    phone: Phone,
    message: MessageSquare,
    messageCircle: MessageCircle,
    send: Send
  },

  actions: {
    plus: Plus,
    minus: Minus,
    edit: Edit,
    delete: Trash2,
    save: Save,
    download: Download,
    upload: Upload,
    share: Share,
    copy: Copy,
    refresh: RefreshCw,
    moreHorizontal: MoreHorizontal,
    moreVertical: MoreVertical
  },

  status: {
    check: Check,
    checkCircle: CheckCircle,
    xCircle: XCircle,
    alert: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    star: Star,
    heart: Heart,
    bookmark: Bookmark,
    flag: Flag,
    thumbsUp: ThumbsUp,
    thumbsDown: ThumbsDown
  },

  content: {
    image: Image,
    video: Video,
    music: Music,
    file: File,
    folder: Folder,
    camera: Camera,
    mic: Mic,
    speaker: Speaker
  },

  development: {
    code: Code,
    terminal: Terminal,
    zap: Zap,
    wrench: Wrench,
    hammer: Hammer,
    palette: Palette,
    layers: Layers,
    grid: Grid,
    layout: Layout
  },

  settings: {
    settings: Settings,
    database: Database,
    server: Server,
    globe: Globe,
    shield: Shield,
    lock: Lock,
    key: Key,
    eye: Eye,
    eyeOff: EyeOff
  },

  nature: {
    sun: Sun,
    moon: Moon,
    cloud: Cloud,
    cloudRain: CloudRain,
    wind: Wind,
    leaf: Leaf,
    tree: TreePine,
    mountain: Mountain
  }
} as const

// Flat icon registry for easy access
export const icons = {
  // Navigation & UI
  home: Home,
  menu: Menu,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,

  // Search & Filter
  search: Search,
  filter: Filter,

  // User Management
  user: User,
  users: Users,
  userPlus: UserPlus,
  userMinus: UserMinus,
  logout: LogOut,

  // Business & Analytics
  barChart: BarChart3,
  pieChart: PieChart,
  lineChart: TrendingUp,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  activity: Activity,
  target: Target,
  dollar: DollarSign,
  shoppingCart: ShoppingCart,
  creditCard: CreditCard,
  receipt: Receipt,
  package: Package,
  truck: Truck,

  // Time & Scheduling
  calendar: Calendar,
  clock: Clock,

  // Communication
  bell: Bell,
  mail: Mail,
  phone: Phone,
  messageSquare: MessageSquare,
  messageCircle: MessageCircle,
  send: Send,

  // Actions
  plus: Plus,
  minus: Minus,
  edit: Edit,
  delete: Trash2,
  trash: Trash2,
  save: Save,
  download: Download,
  upload: Upload,
  share: Share,
  copy: Copy,
  refresh: RefreshCw,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,

  // Status & Feedback
  check: Check,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  info: Info,
  star: Star,
  heart: Heart,
  bookmark: Bookmark,
  flag: Flag,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,

  // Content & Media
  image: Image,
  video: Video,
  music: Music,
  file: File,
  folder: Folder,
  camera: Camera,
  mic: Mic,
  speaker: Speaker,

  // Development & Tools
  code: Code,
  terminal: Terminal,
  zap: Zap,
  wrench: Wrench,
  hammer: Hammer,
  palette: Palette,
  layers: Layers,
  grid: Grid,
  layout: Layout,

  // Settings & Security
  settings: Settings,
  database: Database,
  server: Server,
  globe: Globe,
  shield: Shield,
  lock: Lock,
  key: Key,
  eye: Eye,
  eyeOff: EyeOff,

  // Nature & Environment
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  cloudRain: CloudRain,
  wind: Wind,
  leaf: Leaf,
  tree: TreePine,
  mountain: Mountain
} as const

// Icon component with consistent props
export interface IconProps {
  name: keyof typeof icons
  size?: number | string
  className?: string
  color?: string
  onClick?: () => void
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className = '',
  color,
  onClick
}) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'inherit' }}
    />
  )
}

// Icon utility functions
export const iconUtils = {
  // Get all icons in a category
  getCategoryIcons: (category: keyof typeof iconCategories) => {
    return iconCategories[category]
  },

  // Search icons by name
  searchIcons: (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return Object.entries(icons).filter(([name]) =>
      name.toLowerCase().includes(lowercaseQuery)
    )
  },

  // Get icon by name (with validation)
  getIcon: (name: string): IconType | null => {
    return (icons as any)[name] || null
  },

  // Get all available icon names
  getIconNames: (): string[] => {
    return Object.keys(icons)
  },

  // Get icons for common UI patterns
  getNavigationIcons: () => ({
    home: icons.home,
    back: icons.chevronLeft,
    menu: icons.menu,
    close: icons.close,
    search: icons.search
  }),

  getActionIcons: () => ({
    add: icons.plus,
    edit: icons.edit,
    delete: icons.delete,
    save: icons.save,
    cancel: icons.close
  }),

  getStatusIcons: () => ({
    success: icons.checkCircle,
    error: icons.xCircle,
    warning: icons.alertTriangle,
    info: icons.info,
    loading: icons.refresh
  }),

  getCommerceIcons: () => ({
    cart: icons.shoppingCart,
    payment: icons.creditCard,
    shipping: icons.truck,
    receipt: icons.receipt,
    package: icons.package
  }),

  getAnalyticsIcons: () => ({
    chart: icons.barChart,
    trendUp: icons.trendingUp,
    trendDown: icons.trendingDown,
    target: icons.target,
    activity: icons.activity
  })
}

// No additional exports - everything is handled by wildcard export

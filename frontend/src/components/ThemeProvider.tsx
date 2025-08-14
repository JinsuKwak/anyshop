// "use client"

// import * as React from "react"

// type Theme = "theme-default" | "theme-blue" | "theme-green" | "theme-amber" | "theme-rose" | "theme-purple" | "theme-orange" | "theme-teal" | "theme-mono" | "theme-scaled" | "theme-red" | "theme-yellow" | "theme-violet"

// export const themeAliases: Record<Theme, string> = {
//   "theme-default": "Default",
//   "theme-blue": "Blue",
//   "theme-green": "Green",
//   "theme-amber": "Amber",
//   "theme-rose": "Rose",
//   "theme-purple": "Purple",
//   "theme-orange": "Orange",
//   "theme-teal": "Teal",
//   "theme-mono": "Mono",
//   "theme-scaled": "Scaled",
//   "theme-red": "Red",
//   "theme-yellow": "Yellow",
//   "theme-violet": "Violet",
// }

// type ThemeProviderProps = {
//   children: React.ReactNode
//   defaultTheme?: Theme
//   storageKey?: string
// }

// type ThemeProviderState = {
//   theme: Theme
//   setTheme: (theme: Theme) => void
// }

// const initialState: ThemeProviderState = {
//   theme: "theme-default",
//   setTheme: () => null,
// }

// const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

// export function ThemeProvider({
//   children,
//   defaultTheme = "theme-default",
//   storageKey = "vite-ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const [theme, setTheme] = React.useState<Theme>(defaultTheme)

//   React.useEffect(() => {
//     const storedTheme = localStorage.getItem(storageKey) as Theme
//     if (storedTheme) {
//       setTheme(storedTheme)
//     }
//   }, [])

//   React.useEffect(() => {
//     const root = window.document.documentElement
//     root.classList.remove(...Object.keys(themeAliases))
//     root.classList.add(theme)
//   }, [theme, storageKey])

//   const value = {
//     theme,
//     setTheme: (theme: Theme) => {
//       localStorage.setItem(storageKey, theme)
//       setTheme(theme)
//     },
//   }

//   return (
//     <ThemeProviderContext.Provider {...props} value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   )
// }

// export const useTheme = () => {
//   const context = React.useContext(ThemeProviderContext)

//   if (context === undefined)
//     throw new Error("useTheme must be used within a ThemeProvider")

//   return context
// }

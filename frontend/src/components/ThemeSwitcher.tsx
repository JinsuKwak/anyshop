// "use client";

// import * as React from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { useTheme, themeAliases } from "@/components/ThemeProvider";

// export function ThemeSwitcher() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm">
//           Theme Switcher
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {Object.entries(themeAliases).map(([themeKey, themeName]) => (
//           <DropdownMenuItem
//             key={themeKey}
//             onClick={() => setTheme(themeKey as any)}
//           >
//             {themeName}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import ClassDetail from "./pages/ClassDetail";

function Router() {
  return (
    <Switch>
      {/* Default routes (Chinese) */}
      <Route path={"/"} component={Home} />
      <Route path={"/teams/:team"} component={Teams} />
      <Route path={"/teams"} component={Teams} />
      <Route path={"/class/:classId"} component={ClassDetail} />

      {/* Language-prefixed routes */}
      <Route path={"/:lang/"} component={Home} />
      <Route path={"/:lang/teams/:team"} component={Teams} />
      <Route path={"/:lang/teams"} component={Teams} />
      <Route path={"/:lang/class/:classId"} component={ClassDetail} />

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;

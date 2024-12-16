import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ambulances from './Pages/Ambulances';
import Doctors from './Pages/Doctors';
import Home from './Pages/Home';
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

function App() {
	return (
		<>
				<Toaster />
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
					
						<Route path="/" Component={Home}></Route>
						<Route path="/doctors" Component={Doctors}></Route>
						<Route path="/ambulances" Component={Ambulances}></Route>
					</Routes>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}

export default App;


import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
    title: 'Admin Dashboard | Granet',
    description: 'Granet Admin Dashboard',
};

export default async function AdminPage({ searchParams }) { 
 
  
    // If user is authenticated, render admin dashboard
    return <AdminDashboard />;
}

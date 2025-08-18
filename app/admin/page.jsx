import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import AdminGate from '@/components/AdminGate';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
    title: 'Admin Dashboard | Granet',
    description: 'Granet Admin Dashboard',
};

export default async function AdminPage({ searchParams }) {
    // Check if user has admin cookie
    const cookieStore = cookies();
    const adminCookie = cookieStore.get('admin_session');
    const isAuthenticated = adminCookie && await isAdmin(adminCookie.value);

 
  
    // If user is authenticated, render admin dashboard
    return <AdminDashboard />;
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Bell, HelpCircle, Settings, GraduationCap, LayoutDashboard, 
  Users, Calendar, FileEdit, CreditCard, BarChart, Clock, Plus, 
  Headset, LogOut, Download, CalendarDays, User, Minus, DoorOpen, 
  Zap, TrendingUp, Settings2, Building2, BookOpen, Layers, 
  ClipboardList, Camera, Smile 
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  useEffect(() => {
    // Interactive Chart Bars Animation
    const bars = document.querySelectorAll<HTMLElement>('.chart-bar');
    bars.forEach(bar => {
        const targetHeight = bar.getAttribute('data-height');
        if (targetHeight) {
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.transition = 'height 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                bar.style.height = targetHeight;
            }, 100);
        }
    });
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Top Navigation Anchor */}
      <header className="bg-surface-container-lowest dark:bg-surface-container-lowest border-b border-border-subtle dark:border-outline-variant flex justify-between items-center w-full px-gutter h-16 fixed top-0 z-50">
        <div className="flex items-center gap-8 px-4">
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary">EduSystem Pro</span>
          <div className="hidden md:flex relative group w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant h-5 w-5" />
            <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-body-md focus:ring-2 focus:ring-primary-container transition-all" placeholder="Global search for students, courses, or logs..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <button className="p-2 hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors rounded-full relative">
            <Bell className="text-primary h-6 w-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors rounded-full">
            <HelpCircle className="text-primary h-6 w-6" />
          </button>
          <button className="p-2 hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors rounded-full">
            <Settings className="text-primary h-6 w-6" />
          </button>
          <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-surface-container-low p-1 pr-3 rounded-lg transition-all">
            <img alt="User profile photo" className="w-8 h-8 rounded-full border-2 border-primary-fixed object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHURlB5ZDdd5rYqh-2H0lx62q99yAISoICpqaSn5NzwhuwU5FW158qulatGrXdxwLcFPEx5v-xF-MZ1uIBHcBdaT7ahJtE5fYcLOgpWKOZBD97RtSR97_GQcmkysmXvoRMxN6oI31er5BnB6g6PsVv2Fs44p5kTju4KLd77O-2O0a5RX8oXx9wehKxsRlY1h7bxh56-y9WtK7FgeUqZCULWG8z74x5TqBI2yBOqBZeMarSxbdJgYFBT_YccP99ZpOHHcAth_h8HSpf" />
            <div className="hidden lg:block">
              <p className="font-label-md text-label-md font-bold leading-none">Dr. Alistair Vance</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-border-subtle dark:border-outline-variant flex flex-col py-stack-lg px-4 pt-20 z-40">
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-10 h-10 bg-primary-container text-white rounded-xl flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-title-sm text-title-sm font-bold text-primary">Academix Hub</h2>
            <p className="text-[11px] text-secondary font-medium">Academic Management</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'attendance', label: 'Attendance', icon: Calendar },
            { id: 'exams', label: 'Exams', icon: FileEdit },
            { id: 'fees', label: 'Fees Management', icon: CreditCard },
            { id: 'reports', label: 'Reports', icon: BarChart },
            { id: 'timetable', label: 'Timetable', icon: Clock },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                activeTab === item.id 
                  ? 'sidebar-item-active text-primary' 
                  : 'text-secondary font-body-md hover:bg-surface-container-high'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-1">
          <button className="w-full bg-primary-container text-white py-2.5 rounded-lg font-bold text-label-md hover:opacity-90 transition-all flex items-center justify-center gap-2 mb-4">
            <Plus className="h-5 w-5" />
            New Record
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-secondary font-body-md hover:bg-surface-container-high transition-all rounded-lg">
            <Headset className="h-5 w-5" />
            <span className="font-label-md text-label-md">Support</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-error font-body-md hover:bg-error-container transition-all rounded-lg">
            <LogOut className="h-5 w-5" />
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-20 px-gutter-desktop pb-12">
        <div className="max-w-container-max-width mx-auto">
          {/* Welcome Header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">System Overview</h1>
              <p className="text-on-surface-variant font-body-md mt-1">Institutional health analytics for the 2023/24 Academic Session.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-outline rounded-lg flex items-center gap-2 text-label-md font-bold text-secondary hover:bg-surface-container-low transition-all">
                <Download className="h-4 w-4" />
                Export PDF
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 text-label-md font-bold hover:bg-primary-container transition-all">
                <CalendarDays className="h-4 w-4" />
                Session: Autumn 2024
              </button>
            </div>
          </div>

          {/* Bento Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-gutter mb-8">
            <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary-container text-white rounded-lg">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-secondary font-label-md uppercase tracking-wider text-[10px]">Total Students</p>
                  <h3 className="font-headline-md text-headline-md text-primary">12,482</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-bold text-label-md">
                <TrendingUp className="h-4 w-4" />
                <span>+4.2% from last term</span>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary text-white rounded-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-secondary font-label-md uppercase tracking-wider text-[10px]">Total Faculty</p>
                  <h3 className="font-headline-md text-headline-md text-primary">846</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-bold text-label-md">
                <Minus className="h-4 w-4" />
                <span>Stable workload</span>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-surface-tint text-white rounded-lg">
                  <DoorOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-secondary font-label-md uppercase tracking-wider text-[10px]">Active Sessions</p>
                  <h3 className="font-headline-md text-headline-md text-primary">142</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary-container font-bold text-label-md">
                <Zap className="h-4 w-4" />
                <span>In progress today</span>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-600 text-white rounded-lg">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-secondary font-label-md uppercase tracking-wider text-[10px]">Fees Collected</p>
                  <h3 className="font-headline-md text-headline-md text-primary">$1.24M</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-bold text-label-md">
                <TrendingUp className="h-4 w-4" />
                <span>89% Collection Rate</span>
              </div>
            </div>
          </div>

          {/* Analytics & Performance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-8">
            <div className="lg:col-span-8 glass-card rounded-xl p-8">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="font-title-lg text-title-lg text-primary">Enrollment Trends</h3>
                  <p className="text-on-surface-variant text-body-md">Comparative analysis of student registrations per semester.</p>
                </div>
                <select className="bg-surface-container-low border-none rounded-lg text-label-md py-1.5 focus:ring-1 focus:ring-primary">
                  <option>Last 6 Months</option>
                  <option>Academic Year</option>
                </select>
              </div>
              <div className="h-64 w-full flex items-end gap-4 pb-4">
                <div className="flex-1 bg-surface-container rounded-t-lg relative group chart-bar" data-height="40%" style={{ height: '0%' }}>
                  <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:opacity-80" style={{ height: '70%' }}></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-bold uppercase">Jan</span>
                </div>
                <div className="flex-1 bg-surface-container rounded-t-lg relative group chart-bar" data-height="60%" style={{ height: '0%' }}>
                  <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:opacity-80" style={{ height: '85%' }}></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-bold uppercase">Feb</span>
                </div>
                <div className="flex-1 bg-surface-container rounded-t-lg relative group chart-bar" data-height="45%" style={{ height: '0%' }}>
                  <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:opacity-80" style={{ height: '60%' }}></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-bold uppercase">Mar</span>
                </div>
                <div className="flex-1 bg-surface-container rounded-t-lg relative group chart-bar" data-height="80%" style={{ height: '0%' }}>
                  <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:opacity-80" style={{ height: '95%' }}></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-bold uppercase">Apr</span>
                </div>
                <div className="flex-1 bg-surface-container rounded-t-lg relative group chart-bar" data-height="55%" style={{ height: '0%' }}>
                  <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:opacity-80" style={{ height: '40%' }}></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-bold uppercase">May</span>
                </div>
                <div className="flex-1 bg-surface-container rounded-t-lg relative group chart-bar" data-height="90%" style={{ height: '0%' }}>
                  <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:opacity-80" style={{ height: '100%' }}></div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-bold uppercase">Jun</span>
                </div>
              </div>
            </div>

            {/* Academic Quick Access */}
            <div className="lg:col-span-4 space-y-gutter">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-title-lg text-title-lg text-primary mb-4 flex items-center gap-2">
                  <Settings2 className="text-primary-container h-6 w-6" />
                  Academic Setup
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-secondary-container transition-all group">
                    <Building2 className="text-secondary group-hover:text-primary mb-2 h-6 w-6" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Depts</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-secondary-container transition-all group">
                    <BookOpen className="text-secondary group-hover:text-primary mb-2 h-6 w-6" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Courses</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-secondary-container transition-all group">
                    <Layers className="text-secondary group-hover:text-primary mb-2 h-6 w-6" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Sessions</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-secondary-container transition-all group">
                    <ClipboardList className="text-secondary group-hover:text-primary mb-2 h-6 w-6" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Workload</span>
                  </button>
                </div>
              </div>

              {/* Biometric Status Widget */}
              <div className="bg-primary-container rounded-xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold text-label-md flex items-center gap-2 mb-2">
                    <Camera className="h-5 w-5" />
                    Biometric Systems
                  </h4>
                  <p className="text-[28px] font-bold mb-1">98.4%</p>
                  <p className="text-[11px] text-primary-fixed-dim">Face Recognition Accuracy (Live)</p>
                  <div className="mt-4 flex gap-2">
                    <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 w-[98%]"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                  <Smile className="h-40 w-40" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Table Section */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white">
              <h3 className="font-title-lg text-title-lg text-primary">Recent System Activity</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-surface-container-low text-secondary text-label-md rounded-lg hover:bg-surface-container-high transition-all">Audit Logs</button>
                <button className="px-3 py-1.5 bg-surface-container-low text-secondary text-label-md rounded-lg hover:bg-surface-container-high transition-all">View All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-6 py-4 font-label-md text-primary uppercase text-[11px] tracking-wider">Activity</th>
                    <th className="px-6 py-4 font-label-md text-primary uppercase text-[11px] tracking-wider">User</th>
                    <th className="px-6 py-4 font-label-md text-primary uppercase text-[11px] tracking-wider">Module</th>
                    <th className="px-6 py-4 font-label-md text-primary uppercase text-[11px] tracking-wider">Timestamp</th>
                    <th className="px-6 py-4 font-label-md text-primary uppercase text-[11px] tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-body-md text-primary">New Exam Published</p>
                      <p className="text-xs text-on-surface-variant">Computer Science Midterms</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-secondary-container text-secondary flex items-center justify-center text-[10px] font-bold">JD</div>
                        <span className="text-body-md">Prof. John Doe</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-body-md text-secondary">Exams</span></td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">2 mins ago</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Success</span></td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-body-md text-primary">Biometric Sync Error</p>
                      <p className="text-xs text-on-surface-variant">Terminal 04 Offline</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">SYS</div>
                        <span className="text-body-md">System Agent</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-body-md text-secondary">Attendance</span></td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">15 mins ago</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase">Warning</span></td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-body-md text-primary">Fee Structure Update</p>
                      <p className="text-xs text-on-surface-variant">Semester 4 Library Fees</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img alt="User" className="w-7 h-7 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCMBmA6lTJgEolXt9m2Ud1FlyXSLGo0R6SjAlNX1CXAEt_dsKaESaaTJS7NsMcjC3SoUm4xAQnbIXriNy4RaXovC9xu7owDY4pPaZke-34P2RPram_YtsAm-VFASrsqWtatTYkWLSV0qJVuytVvHoqjxBvSmDs_jwnYt5scwuY9KwH1NqQtVfMf51Wl2wst23QO1H5O9Xk5IyL_BKpDPxTXE_ZP1oShwhSRRnVMFAJfYIk2aisflMZO_eQfHkb-NVyc9UOG9C3Wouc" />
                        <span className="text-body-md">Sarah Jenkins</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-body-md text-secondary">Finance</span></td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">1 hour ago</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Success</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Contextual Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <Plus className="group-hover:rotate-90 transition-transform duration-300 h-6 w-6" />
        <div className="absolute right-full mr-4 bg-primary text-white px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
          Quick Action
        </div>
      </button>
    </div>
  );
}

"use client"

import React from "react";
import Link from "next/link";
import {Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const Layout = ({children}: {
    children: React.ReactNode
}) => {


    const pathname = usePathname()


    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <Package2 className="h-6 w-6"/>
                                <span className="">Admin Dashboard</span>
                            </Link>
                            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                <Bell className="h-4 w-4"/>
                                <span className="sr-only">Toggle notifications</span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                {menuItems.map((item, index) => (
                                    <Link
                                        href="#"
                                        key={index}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                            pathname === item.href && "bg-muted text-primary"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4"/>
                                        {item.name}
                                        {item.badge && (
                                            <Badge
                                                className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <SheetTitle>Main Menu</SheetTitle>
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <Package2 className="h-6 w-6"/>
                                        <span className="">Acme Inc</span>
                                    </Link>
                                    {menuItems.map((item, index) => (
                                        <Link
                                            href="#"
                                            key={index}
                                            className={cn(
                                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                                pathname === item.href && "bg-muted text-foreground"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5"/>
                                            {item.name}
                                            {item.badge && (
                                                <Badge
                                                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5"/>
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}


export default Layout;



const menuItems = [
    {
        name: "Dashboard",
        icon: Home,
        href: "#",
    },
    {
        name: "Orders",
        icon: ShoppingCart,
        href: "/",
        badge: 6,
    },
    {
        name: "Products",
        icon: Package,
        href: "#",
    },
    {
        name: "Customers",
        icon: Users,
        href: "#",
    },
    {
        name: "Analytics",
        icon: LineChart,
        href: "#",
    },
];
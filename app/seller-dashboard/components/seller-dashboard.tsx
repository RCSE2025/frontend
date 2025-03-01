"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductManagement } from "./product-management"
import { ModerationModule } from "./moderation-module"
import { AnalyticsModule } from "./analytics-module"
import { DashboardOverview } from "./dashboard-overview"

export function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Панель управления продавца</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="products">Управление товарами</TabsTrigger>
          <TabsTrigger value="moderation">Модерация</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Обзор бизнеса</CardTitle>
              <CardDescription>
                Основные показатели вашего бизнеса и активности товаров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardOverview />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Управление товарами</CardTitle>
              <CardDescription>
                Добавление, редактирование и управление вашими товарами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductManagement />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle>Модерация товаров</CardTitle>
              <CardDescription>
                Отслеживание статуса модерации ваших товаров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ModerationModule />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Аналитика продаж</CardTitle>
              <CardDescription>
                Статистика и аналитика продаж ваших товаров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsModule />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
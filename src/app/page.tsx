"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { AgeDistributionChart } from "@/components/age-distribution-chart"
import { GenderDistributionChart } from "@/components/gender-distribution-chart"
import { NationalityDistributionChart } from "@/components/nationality-distribution-chart"
import type { UserData } from "@/types/user-data"
import type { FieldTemplate } from "@/types/field-template"
import { FieldTemplatesTable } from "@/components/field-templates-table"

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData[]>([])
  const [fieldTemplates, setFieldTemplates] = useState<FieldTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTemplatesLoading, setIsTemplatesLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:3001/cccd-info")
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchTemplates = async () => {
      try {
        setIsTemplatesLoading(true)
        const response = await fetch("http://localhost:3001/field-template")
        const data = await response.json()
        setFieldTemplates(data)
      } catch (error) {
        console.error("Error fetching field templates:", error)
      } finally {
        setIsTemplatesLoading(false)
      }
    }

    fetchData()
    fetchTemplates()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bảng Điều Khiển</h1>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="table" className="cursor-pointer">
            Thông tin CCCD
          </TabsTrigger>
          <TabsTrigger value="statistics" className="cursor-pointer">
            Thống Kê
          </TabsTrigger>
          <TabsTrigger value="templates" className="cursor-pointer">
            Mẫu thông tin cá nhân
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dữ Liệu Thông Tin CCCD</CardTitle>
              <CardDescription>Danh sách đầy đủ các bản ghi CCCD trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <DataTable columns={columns} data={userData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân Bố Độ Tuổi</CardTitle>
                <CardDescription>Phân bố người dùng theo nhóm tuổi</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                {isLoading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="h-[300px] w-full">
                    <AgeDistributionChart data={userData} />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phân Bố Giới Tính</CardTitle>
                  <CardDescription>Phân bố người dùng theo giới tính</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 pb-6">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[300px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full">
                      <GenderDistributionChart data={userData} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phân Bố Quốc Tịch</CardTitle>
                  <CardDescription>Top 10 quốc tịch</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 pb-6">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[300px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full">
                      <NationalityDistributionChart data={userData} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mẫu Biểu</CardTitle>
              <CardDescription>Quản lý các mẫu biểu cho biểu mẫu và tài liệu của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              {isTemplatesLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <FieldTemplatesTable data={fieldTemplates} onUpdate={setFieldTemplates} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useTokenRefresh } from "@/hooks/use-token-refresh" // Import the useTokenRefresh hook
import { apiClient } from "@/lib/api-client" // Import new API client
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Save, X, Shield, Clock, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast" // Import toast for user feedback

export function UserProfile() {
  const { user } = useAuth()
  const { isRefreshing, lastRefresh, manualRefresh, isTokenValid } = useTokenRefresh() // Use the imported hook
  const { toast } = useToast() // Add toast for user feedback
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false) // Add saving state
  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  })

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    return user?.username?.[0]?.toUpperCase() || "U"
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await apiClient.user.updateProfile(editData)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={isSaving}>
                <X className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username}
              </h3>
              <p className="text-sm text-muted-foreground">@{user?.username}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={editData.firstName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={editData.lastName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={editData.email}
                    onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">EMAIL</Label>
                  <p className="text-sm">{user?.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">USERNAME</Label>
                  <p className="text-sm">{user?.username}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">USER ID</Label>
                  <p className="text-sm font-mono">{user?.id}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Status
          </CardTitle>
          <CardDescription>Your account security information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isTokenValid ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">Session Status</span>
            </div>
            <Badge variant={isTokenValid ? "default" : "destructive"}>{isTokenValid ? "Active" : "Expired"}</Badge>
          </div>

          {lastRefresh && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last Token Refresh</span>
              </div>
              <span className="text-xs text-muted-foreground">{lastRefresh.toLocaleTimeString()}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={manualRefresh}
            disabled={isRefreshing}
            className="w-full bg-transparent"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Session
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

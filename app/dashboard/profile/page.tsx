"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Camera, Check, Mail, Phone, School, User } from "lucide-react"
import dashboardData from "@/data/dashboard.json"
import landingData from "@/data/landing.json"

export default function ProfilePage() {
  const { user } = dashboardData
  const { signup } = landingData
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "+234 801 234 5678",
    institution: user.institution,
    department: user.department,
    level: user.level,
  })

  const handleSave = () => {
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account information and preferences.</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  <Award className="w-3 h-3" />
                  Verified Member
                </span>
                <span className="text-xs text-muted-foreground">ID: {user.membershipId}</span>
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={isEditing ? "bg-primary text-primary-foreground" : "border-border"}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="bg-secondary/50 border-border disabled:opacity-70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10 bg-secondary/50 border-border disabled:opacity-70"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10 bg-secondary/50 border-border disabled:opacity-70"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Select
                value={formData.institution}
                onValueChange={(value) => setFormData({ ...formData, institution: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-secondary/50 border-border disabled:opacity-70">
                  <SelectValue placeholder="Select institution" />
                </SelectTrigger>
                <SelectContent>
                  {signup.institutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                disabled={!isEditing}
                className="bg-secondary/50 border-border disabled:opacity-70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-secondary/50 border-border disabled:opacity-70">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {["100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "Postgraduate"].map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Membership Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground">Member ID</p>
              <p className="text-sm font-medium text-foreground mt-1">{user.membershipId}</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="text-sm font-medium text-foreground mt-1">{user.memberSince}</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-primary mt-1">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

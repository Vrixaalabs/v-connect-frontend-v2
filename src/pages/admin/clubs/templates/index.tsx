import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { ColorPicker } from "@/components/admin/ColorPicker"
import { Switch } from "@/components/ui/switch"

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean and modern design with emphasis on visuals",
    image: "/templates/modern.png",
    features: ["Hero section", "Stats cards", "Timeline view", "Gallery grid"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    image: "/templates/minimal.png",
    features: ["Clean typography", "Whitespace", "Subtle animations"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and artistic design for creative clubs",
    image: "/templates/creative.png",
    features: ["Dynamic layouts", "Custom illustrations", "Interactive elements"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate style for academic and professional clubs",
    image: "/templates/professional.png",
    features: ["Structured layout", "Document sections", "Member profiles"],
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [primaryColor, setPrimaryColor] = useState("#0066FF")
  const [accentColor, setAccentColor] = useState("#FF3366")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Page Templates</h1>
        <p className="text-muted-foreground mt-2">
          Choose and customize your club page template
        </p>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Choose Template</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="content">Content Blocks</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={selectedTemplate === template.id ? "ring-2 ring-primary" : ""}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={selectedTemplate}
                    onValueChange={setSelectedTemplate}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={template.id} id={template.id} />
                      <Label htmlFor={template.id} className="font-semibold">
                        {template.name}
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground mt-2">
                    {template.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {template.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    {selectedTemplate === template.id ? "Selected" : "Select Template"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Colors & Branding</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <ColorPicker color={accentColor} onChange={setAccentColor} />
                </div>
                <div className="space-y-2">
                  <Label>Club Logo</Label>
                  <Input type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <Input type="file" accept="image/*" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Layout & Features</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Show Hero Section</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Gallery</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Statistics</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Events</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Achievements</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Announcements</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Custom Content Blocks</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>About Section</Label>
                <textarea
                  placeholder="Enter a detailed description about your club..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Mission Statement</Label>
                <textarea
                  placeholder="What is your club's mission?"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Information</Label>
                <Input placeholder="Email" type="email" />
                <Input placeholder="Location" className="mt-2" />
                <Input placeholder="Meeting Times" className="mt-2" />
              </div>
              <div className="space-y-2">
                <Label>Social Media Links</Label>
                <Input placeholder="Instagram URL" className="mt-2" />
                <Input placeholder="Facebook URL" className="mt-2" />
                <Input placeholder="LinkedIn URL" className="mt-2" />
                <Input placeholder="Website URL" className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Preview</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
} 
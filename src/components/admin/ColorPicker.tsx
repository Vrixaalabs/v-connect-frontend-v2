"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const presetColors = [
  "#0066FF", // Blue
  "#FF3366", // Pink
  "#33CC66", // Green
  "#FF9933", // Orange
  "#9933FF", // Purple
  "#FF3333", // Red
  "#33CCFF", // Light Blue
  "#FFCC33", // Yellow
]

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color)

  useEffect(() => {
    setInputColor(color)
  }, [color])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputColor(value)
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(value)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !color && "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: color }}
            />
            <span>{color}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Pick a Color</Label>
            <div
              className="h-32 rounded-md border"
              style={{ backgroundColor: inputColor }}
            />
          </div>
          <div className="space-y-2">
            <Label>Hex Color</Label>
            <Input
              value={inputColor}
              onChange={handleInputChange}
              placeholder="#000000"
            />
          </div>
          <div className="space-y-2">
            <Label>Presets</Label>
            <div className="grid grid-cols-8 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    "h-6 w-6 rounded-md border",
                    color === presetColor && "ring-2 ring-primary ring-offset-2"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => {
                    onChange(presetColor)
                    setInputColor(presetColor)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 
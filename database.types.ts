export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      category: {
        Row: {
          id: number
          name: string
          type: string
        }
        Insert: {
          id?: number
          name: string
          type: string
        }
        Update: {
          id?: number
          name?: string
          type?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          about: string | null
          email: string
          id: number
          image: string | null
          name: string
          phone: string | null
          profession: string | null
        }
        Insert: {
          about?: string | null
          email: string
          id?: number
          image?: string | null
          name: string
          phone?: string | null
          profession?: string | null
        }
        Update: {
          about?: string | null
          email?: string
          id?: number
          image?: string | null
          name?: string
          phone?: string | null
          profession?: string | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string | null
          id: string
          is_category: boolean | null
          name: string
          order_index: number
          parent_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_category?: boolean | null
          name: string
          order_index: number
          parent_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_category?: boolean | null
          name?: string
          order_index?: number
          parent_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          description: string
          id: number
          name: string
          price: number
          subcategory_id: number | null
        }
        Insert: {
          description: string
          id?: number
          name: string
          price: number
          subcategory_id?: number | null
        }
        Update: {
          description?: string
          id?: number
          name?: string
          price?: number
          subcategory_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategory"
            referencedColumns: ["id"]
          },
        ]
      }
      register: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string | null
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name?: string | null
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string | null
          password?: string
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategory: {
        Row: {
          category_id: number | null
          id: number
          name: string
        }
        Insert: {
          category_id?: number | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategory_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_details: {
        Row: {
          content: Json
          id: number
          section_type: string
          vehicle_id: number | null
        }
        Insert: {
          content: Json
          id?: number
          section_type: string
          vehicle_id?: number | null
        }
        Update: {
          content?: Json
          id?: number
          section_type?: string
          vehicle_id?: number | null
        }
        Relationships: []
      }
      vehicle_details_new: {
        Row: {
          content: Json | null
          id: number
          vehicle_id: number | null
        }
        Insert: {
          content?: Json | null
          id?: number
          vehicle_id?: number | null
        }
        Update: {
          content?: Json | null
          id?: number
          vehicle_id?: number | null
        }
        Relationships: []
      }
      vehicle_detailss: {
        Row: {
          created_at: string | null
          id: number
          vehicle_name: string
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          vehicle_name: string
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          vehicle_name?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

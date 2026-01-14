export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      care_tips: {
        Row: {
          category: string
          content: string
          created_at: string
          icon: string | null
          id: string
          order_index: number | null
          pet_category: Database["public"]["Enums"]["pet_category"] | null
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          icon?: string | null
          id?: string
          order_index?: number | null
          pet_category?: Database["public"]["Enums"]["pet_category"] | null
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          icon?: string | null
          id?: string
          order_index?: number | null
          pet_category?: Database["public"]["Enums"]["pet_category"] | null
          title?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      pet_profiles: {
        Row: {
          budget_range: string | null
          category: Database["public"]["Enums"]["pet_category"]
          created_at: string
          daily_care: string | null
          description: string | null
          dos_and_donts: string | null
          health_issues: string | null
          id: string
          ideal_owner: string | null
          image_url: string | null
          name: string
          space_needs: string | null
          temperament: string | null
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          category: Database["public"]["Enums"]["pet_category"]
          created_at?: string
          daily_care?: string | null
          description?: string | null
          dos_and_donts?: string | null
          health_issues?: string | null
          id?: string
          ideal_owner?: string | null
          image_url?: string | null
          name: string
          space_needs?: string | null
          temperament?: string | null
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          category?: Database["public"]["Enums"]["pet_category"]
          created_at?: string
          daily_care?: string | null
          description?: string | null
          dos_and_donts?: string | null
          health_issues?: string | null
          id?: string
          ideal_owner?: string | null
          image_url?: string | null
          name?: string
          space_needs?: string | null
          temperament?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          created_at: string
          id: string
          options: Json
          order_index: number
          question: string
          question_type: Database["public"]["Enums"]["quiz_question_type"]
          weight_mapping: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          options: Json
          order_index?: number
          question: string
          question_type?: Database["public"]["Enums"]["quiz_question_type"]
          weight_mapping?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          options?: Json
          order_index?: number
          question?: string
          question_type?: Database["public"]["Enums"]["quiz_question_type"]
          weight_mapping?: Json | null
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json
          created_at: string
          id: string
          recommended_category:
            | Database["public"]["Enums"]["pet_category"]
            | null
          recommended_pets: string[] | null
          score_breakdown: Json | null
          session_id: string
        }
        Insert: {
          answers: Json
          created_at?: string
          id?: string
          recommended_category?:
            | Database["public"]["Enums"]["pet_category"]
            | null
          recommended_pets?: string[] | null
          score_breakdown?: Json | null
          session_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          recommended_category?:
            | Database["public"]["Enums"]["pet_category"]
            | null
          recommended_pets?: string[] | null
          score_breakdown?: Json | null
          session_id?: string
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
      pet_category: "dog" | "cat" | "bird"
      quiz_question_type: "single_choice" | "multiple_choice" | "scale"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pet_category: ["dog", "cat", "bird"],
      quiz_question_type: ["single_choice", "multiple_choice", "scale"],
    },
  },
} as const

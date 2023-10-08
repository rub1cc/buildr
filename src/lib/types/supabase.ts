export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invitations: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_published: boolean | null
          is_template: boolean | null
          slug: string
          title: string
          updated_at: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_published?: boolean | null
          is_template?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_published?: boolean | null
          is_template?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

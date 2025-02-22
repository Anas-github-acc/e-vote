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
      candidate_status: {
        Row: {
          candidate_address: string
          election_id: number
          id: string
          ispublic: boolean
          votes: number
        }
        Insert: {
          candidate_address: string
          election_id: number
          id: string
          ispublic?: boolean
          votes?: number
        }
        Update: {
          candidate_address?: string
          election_id?: number
          id?: string
          ispublic?: boolean
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "candidate_status_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["election_id"]
          },
          {
            foreignKeyName: "candidate_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "voters"
            referencedColumns: ["id"]
          },
        ]
      }
      elections: {
        Row: {
          Created_at: string
          election_details: string | null
          election_id: number
          election_name: string
          end_at: string | null
          exists: boolean
          Start_at: string | null
          voting_in_progress: boolean
        }
        Insert: {
          Created_at?: string
          election_details?: string | null
          election_id?: number
          election_name: string
          end_at?: string | null
          exists?: boolean
          Start_at?: string | null
          voting_in_progress?: boolean
        }
        Update: {
          Created_at?: string
          election_details?: string | null
          election_id?: number
          election_name?: string
          end_at?: string | null
          exists?: boolean
          Start_at?: string | null
          voting_in_progress?: boolean
        }
        Relationships: []
      }
      users: {
        Row: {
          admin: boolean
          id: string
          role: string
          username: string
        }
        Insert: {
          admin?: boolean
          id?: string
          role?: string
          username?: string
        }
        Update: {
          admin?: boolean
          id?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      voter_status: {
        Row: {
          election_id: number | null
          id: string
          voted: boolean
          voter_address: string
        }
        Insert: {
          election_id?: number | null
          id: string
          voted?: boolean
          voter_address: string
        }
        Update: {
          election_id?: number | null
          id?: string
          voted?: boolean
          voter_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "voter_status_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["election_id"]
          },
          {
            foreignKeyName: "voter_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      voters: {
        Row: {
          country: string
          id: string
          name: string
          phone_no: number | null
          uid_no: string
          uid_proof_url: string | null
        }
        Insert: {
          country: string
          id: string
          name: string
          phone_no?: number | null
          uid_no: string
          uid_proof_url?: string | null
        }
        Update: {
          country?: string
          id?: string
          name?: string
          phone_no?: number | null
          uid_no?: string
          uid_proof_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voters_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      candidate_status_public: {
        Row: {
          id: string | null
          ispublic: boolean | null
          votes: number | null
        }
        Insert: {
          id?: string | null
          ispublic?: boolean | null
          votes?: number | null
        }
        Update: {
          id?: string | null
          ispublic?: boolean | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "voters"
            referencedColumns: ["id"]
          },
        ]
      }
      voter_status_public: {
        Row: {
          id: string | null
          voted: boolean | null
        }
        Insert: {
          id?: string | null
          voted?: boolean | null
        }
        Update: {
          id?: string | null
          voted?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "voter_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

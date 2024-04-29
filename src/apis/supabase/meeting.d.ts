export interface Meeting {
  id: number;
  title: string;
  introduction: string;
  image_url?: string;
  max_occupancy: number;
  created_at: string;
  performance_id: string;
  performance_name: string;
}

export interface MeetingInfo extends Meeting {
  current_occupancy: number;
}

export interface createMeetingParams
  extends Omit<Meeting, 'id' | 'created_at'> {}

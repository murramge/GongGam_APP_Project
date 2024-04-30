export interface Meeting {
  id: number;
  title: string;
  introduction: string;
  max_occupancy: number;
  meeting_at: string; // ISO String
  created_at: string; // ISO String
  perf_image_url?: string;
  perf_id: string;
  perf_name: string;
  perf_genre: string;
  perf_runtime: number;
  perf_at: string; // ISO String
}

export interface MeetingInfo extends Meeting {
  current_occupancy: number;
}

export interface createMeetingParams
  extends Omit<Meeting, 'id' | 'created_at'> {}

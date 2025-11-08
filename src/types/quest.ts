export interface QuestLocation {
  id: string;
  name: string;
  description: string;
  category: "景點" | "公園" | "運動場館";
  lat: number;
  lng: number;
  bonus: {
    strength?: number;
    mood?: number;
  };
  status?: "available" | "in-progress" | "completed"; // 從後端取得的狀態
  distance?: number; // 距離使用者的距離（公尺）
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

// 後端 API 返回的旅遊打卡記錄
export interface TravelCheckin {
  id: number;
  user_id: number;
  quest_id: string;
  completed_at: string;
  lat: number;
  lng: number;
}

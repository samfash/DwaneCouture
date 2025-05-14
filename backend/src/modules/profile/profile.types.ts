export type Gender = "male" | "female";

export interface ProfileBase {
    id?: string;
    user_id: string;
    full_name: string;
    gender: Gender;
    delivery_address: string;
    createdAt?: Date;
}

export interface MaleMeasurements {
    profile_id?: string;
    neck: number;
    chest: number;
    waist: number;
    hips: number;
    shoulder?: number;
    thigh?: number;
    sleeve_length?: number;
    round_sleeve?: number;
    wrist?: number;
    shirt_length?: number;
    trouser_length?: number;
}

export interface FemaleMeasurements {
    profile_id: string;
    burst: number;
    waist: number;
    hips: number;
    full_length: number;
    shoulder?: number;
    nipple_to_nipple?: number;
    shoulder_to_under_burst?: number;
    half_length?: number;
    thigh?: number;
    round_sleeve?: number;
    wrist?: number;
    sleeve_length?: number;
    shirt_length?: number;
    trouser_length?: number;
}
export interface UserProfile {
    profile: ProfileBase;
    measurements: MaleMeasurements | FemaleMeasurements;
  }
  
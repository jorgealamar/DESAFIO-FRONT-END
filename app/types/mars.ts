export interface MarsPhoto {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: CameraInfo[];
}

export interface CameraInfo {
  name: string;
  full_name: string;
}

export interface PhotosResponse {
  photos: MarsPhoto[];
}

export interface RoverManifest {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: ManifestPhoto[];
  };
}

export interface ManifestPhoto {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: string[];
}

export const ROVERS = ['Curiosity', 'Opportunity', 'Spirit', 'Perseverance'] as const;

export const CAMERAS = {
  FHAZ: 'Front Hazard Avoidance Camera',
  RHAZ: 'Rear Hazard Avoidance Camera',
  MAST: 'Mast Camera',
  CHEMCAM: 'Chemistry and Camera Complex',
  MAHLI: 'Mars Hand Lens Imager',
  MARDI: 'Mars Descent Imager',
  NAVCAM: 'Navigation Camera',
  PANCAM: 'Panoramic Camera',
  MINITES: 'Miniature Thermal Emission Spectrometer',
  EDL_RUCAM: 'Rover Up-Look Camera',
  EDL_RDCAM: 'Rover Down-Look Camera',
  EDL_DDCAM: 'Descent Stage Down-Look Camera',
  EDL_PUCAM1: 'Parachute Up-Look Camera A',
  EDL_PUCAM2: 'Parachute Up-Look Camera B',
  NAVCAM_LEFT: 'Navigation Camera - Left',
  NAVCAM_RIGHT: 'Navigation Camera - Right',
  MCZ_LEFT: 'Mast Camera Zoom - Left',
  MCZ_RIGHT: 'Mast Camera Zoom - Right',
  FRONT_HAZCAM_LEFT_A: 'Front Hazard Avoidance Camera - Left A',
  FRONT_HAZCAM_RIGHT_A: 'Front Hazard Avoidance Camera - Right A',
  REAR_HAZCAM_LEFT: 'Rear Hazard Avoidance Camera - Left',
  REAR_HAZCAM_RIGHT: 'Rear Hazard Avoidance Camera - Right',
  SKYCAM: 'MEDA Skycam',
  SHERLOC_WATSON: 'SHERLOC WATSON Camera',
} as const;

// Mapeamento de câmeras disponíveis por rover
export const CAMERAS_BY_ROVER = {
  Curiosity: {
    FHAZ: 'Front Hazard Avoidance Camera',
    RHAZ: 'Rear Hazard Avoidance Camera',
    MAST: 'Mast Camera',
    CHEMCAM: 'Chemistry and Camera Complex',
    MAHLI: 'Mars Hand Lens Imager',
    MARDI: 'Mars Descent Imager',
    NAVCAM: 'Navigation Camera',
  },
  Opportunity: {
    FHAZ: 'Front Hazard Avoidance Camera',
    RHAZ: 'Rear Hazard Avoidance Camera',
    NAVCAM: 'Navigation Camera',
    PANCAM: 'Panoramic Camera',
    MINITES: 'Miniature Thermal Emission Spectrometer',
  },
  Spirit: {
    FHAZ: 'Front Hazard Avoidance Camera',
    RHAZ: 'Rear Hazard Avoidance Camera',
    NAVCAM: 'Navigation Camera',
    PANCAM: 'Panoramic Camera',
    MINITES: 'Miniature Thermal Emission Spectrometer',
  },
  Perseverance: {
    EDL_RUCAM: 'Rover Up-Look Camera',
    EDL_RDCAM: 'Rover Down-Look Camera',
    EDL_DDCAM: 'Descent Stage Down-Look Camera',
    EDL_PUCAM1: 'Parachute Up-Look Camera A',
    EDL_PUCAM2: 'Parachute Up-Look Camera B',
    NAVCAM_LEFT: 'Navigation Camera - Left',
    NAVCAM_RIGHT: 'Navigation Camera - Right',
    MCZ_LEFT: 'Mast Camera Zoom - Left',
    MCZ_RIGHT: 'Mast Camera Zoom - Right',
    FRONT_HAZCAM_LEFT_A: 'Front Hazard Avoidance Camera - Left A',
    FRONT_HAZCAM_RIGHT_A: 'Front Hazard Avoidance Camera - Right A',
    REAR_HAZCAM_LEFT: 'Rear Hazard Avoidance Camera - Left',
    REAR_HAZCAM_RIGHT: 'Rear Hazard Avoidance Camera - Right',
    SKYCAM: 'MEDA Skycam',
    SHERLOC_WATSON: 'SHERLOC WATSON Camera',
  },
} as const;
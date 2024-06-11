interface NewLogEntry {
    title?: string,
    longitude: number,
    latitude: number,
    visitDate?: Date,
    description?: string,
    comments?: string,
    rating?: number,
    image?: string
} 

interface LogEntry {
    _id: string;
    title: string,
    longitude: number,
    latitude: number,
    visitDate: string,  //Date stored as string
    description?: string,
    comments?: string,
    rating?: number,
    image?: string
} 

interface MarkerLocation {
    longitude: number,
    latitude: number
}

interface ShowPopup {
    [_id: string]: boolean;
  }
  
export interface TeamMember {
  name: string; 
  id:string;
  image: string; 
  jobTitle: string; 
  hasBiography: boolean;
  description?: string;
  slug: string; 
  email?: string; 
  linkedIn?: string; 
  quote?: string; 
}

export interface TeamGroup {
  name: string; 
  members: TeamMember[]; 
}
 
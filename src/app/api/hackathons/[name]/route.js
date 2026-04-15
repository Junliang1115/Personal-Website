import { NextResponse } from 'next/server';
import projects from '@/data/projects.json';

export async function GET(req, { params }) {
    try {
        const { name } = await params;
        const decodedName = decodeURIComponent(name);
        const searchName = decodedName.replace(/-/g, ' ');
        
        const hackathon = projects.find(p => 
            p.name.toLowerCase() === searchName.toLowerCase()
        );
        
        if (!hackathon) {
            return NextResponse.json({ message: 'Hackathon not found' }, { status: 404 });
        }
        
        return NextResponse.json(hackathon);
    } catch (err) {
        console.error('Error fetching hackathon details:', err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

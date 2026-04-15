import { NextResponse } from 'next/server';
import projects from '@/data/projects.json';

export async function GET() {
    try {
        return NextResponse.json(projects);
    } catch (err) {
        console.error('Error fetching hackathons:', err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

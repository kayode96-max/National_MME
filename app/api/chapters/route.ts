import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'dashboard.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data.chapters || []);
  } catch (error) {
    console.error('Error reading chapters data:', error);
    return NextResponse.json(
      { error: 'Failed to load chapters data' },
      { status: 500 }
    );
  }
}

import {NextRequest, NextResponse} from "next/server";
import supabase from "@/utils/supabase";

export async function GET() {
  const {data, error} = await supabase.rpc('get_letter_race_marathon');

  if (error) {
    return NextResponse.json({error: 'Something went wrong!'}, {status: 400});
  }

  return NextResponse.json({data: data as any[]});
}



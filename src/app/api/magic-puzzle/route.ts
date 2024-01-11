import {NextRequest, NextResponse} from "next/server";
import supabase from "@/utils/supabase";

export async function GET() {
  const {data, error} = await supabase.rpc('get_letter_race_marathon');

  if (error) {
    return NextResponse.json({error: 'Something went wrong!'}, {status: 400});
  }
  // if (error) res.status(400).json({error: 'Something went wrong!'});

  // res.status(200).json({data: data as ProductInterface[]});

  return NextResponse.json({data: data as any[]});
  // return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
}



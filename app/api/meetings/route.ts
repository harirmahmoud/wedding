import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export enum MeetingOptionType {
  PHOTOGRAPHY = "PHOTOGRAPHY",
  VENUE = "VENUE",
  RESTAURANT = "RESTAURANT",
  OVERNIGHT_STAYING = "OVERNIGHT_STAYING",
  TRANSPORT = "TRANSPORT",
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (
      !data.fullName ||
      !data.phone ||
      !data.email ||
      !data.eventDate ||
      !data.attendeesCount
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();

    // 1️⃣ Insert meeting
    const { data: meeting, error: meetingError } = await supabase
      .from("meetings")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        event_date: new Date(data.eventDate).toISOString(),
        attendees_count: parseInt(data.attendeesCount, 10),
        badges: data.badges ?? false,
      })
      .select()
      .single();

    if (meetingError) throw meetingError;

    // 2️⃣ Build options
    const options = [
      ...(data.photography ?? []).map((value: string) => ({
        meeting_id: meeting.id,
        type: MeetingOptionType.PHOTOGRAPHY,
        value,
      })),
      ...(data.venues ?? []).map((value: string) => ({
        meeting_id: meeting.id,
        type: MeetingOptionType.VENUE,
        value,
      })),
      ...(data.restaurant ?? []).map((value: string) => ({
        meeting_id: meeting.id,
        type: MeetingOptionType.RESTAURANT,
        value,
      })),
      ...(data.overnightStaying ?? []).map((value: string) => ({
        meeting_id: meeting.id,
        type: MeetingOptionType.OVERNIGHT_STAYING,
        value,
      })),
      ...(data.transport ?? []).map((value: string) => ({
        meeting_id: meeting.id,
        type: MeetingOptionType.TRANSPORT,
        value,
      })),
    ];

    // 3️⃣ Insert options
    if (options.length > 0) {
      const { error: optionsError } = await supabase
        .from("meeting_options")
        .insert(options);

      if (optionsError) throw optionsError;
    }

    return NextResponse.json(
      { success: true, meeting },
      { status: 201 }
    );

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
}

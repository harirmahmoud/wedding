import { NextResponse } from "next/server";
import { eventApiSchema } from "@/lib/validators/event";
import { createServerSupabase } from "@/lib/supabase/server";



export enum EventOptionType {
  VENUES = "VENUES",
  CATERING_STYLE = "CATERING_STYLE",
  ENTERTAINMENT = "ENTERTAINMENT",
  DECORATION = "DECORATION",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  BEAUTY = "BEAUTY",
  TRANSPORT = "TRANSPORT",
  INVITATIONS = "INVITATIONS",
  CLOTHING_RENTAL = "CLOTHING_RENTAL",
  HONEYMOON = "HONEYMOON",
  WEDDING_NIGHT = "WEDDING_NIGHT",
  OVERNIGHT_STAYING = "OVERNIGHT_STAYING",
  TROUSE_DE_MARIE = "TROUSE_DE_MARIE",
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = eventApiSchema.parse(body);

    const supabase = createServerSupabase();

    // 1️⃣ Insert event
    const { data: event, error: eventError } = await supabase
      .from("events")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        event_date: new Date(data.eventDate).toISOString(),
        adults_count: Number(data.adultsCount),
        children_count: data.childrenCount
          ? Number(data.childrenCount)
          : null,
      })
      .select()
      .single();

    if (eventError) throw eventError;

    // 2️⃣ Build options array
    const options = [
      ...(data.venues ?? []).map(v => ({ type: EventOptionType.VENUES, value: v })),
      ...(data.cateringStyle ?? []).map(v => ({ type: EventOptionType.CATERING_STYLE, value: v })),
      ...(data.entertainment ?? []).map(v => ({ type: EventOptionType.ENTERTAINMENT, value: v })),
      ...(data.decoration ?? []).map(v => ({ type: EventOptionType.DECORATION, value: v })),
      ...(data.photography ?? []).map(v => ({ type: EventOptionType.PHOTOGRAPHY, value: v })),
      ...(data.beauty ?? []).map(v => ({ type: EventOptionType.BEAUTY, value: v })),
      ...(data.transport ?? []).map(v => ({ type: EventOptionType.TRANSPORT, value: v })),
      ...(data.invitations ?? []).map(v => ({ type: EventOptionType.INVITATIONS, value: v })),
      ...(data.clothingRental ?? []).map(v => ({ type: EventOptionType.CLOTHING_RENTAL, value: v })),
      ...(data.honeymoon ?? []).map(v => ({ type: EventOptionType.HONEYMOON, value: v })),
      ...(data.weddingNight ?? []).map(v => ({ type: EventOptionType.WEDDING_NIGHT, value: v })),
      ...(data.overnightStaying ?? []).map(v => ({ type: EventOptionType.OVERNIGHT_STAYING, value: v })),
      ...(data.trouse_de_marie ?? []).map(v => ({ type: EventOptionType.TROUSE_DE_MARIE, value: v })),
    ].map(opt => ({
      ...opt,
      event_id: event.id,
    }));

    // 3️⃣ Insert options (bulk)
    if (options.length > 0) {
      const { error: optionsError } = await supabase
        .from("event_options")
        .insert(options);

      if (optionsError) throw optionsError;
    }

    return NextResponse.json(
      { success: true, event },
      { status: 201 }
    );

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message ?? "Failed to create event" },
      { status: 400 }
    );
  }
}

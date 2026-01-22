import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

// 1️⃣ Zod schema matching your frontend
export const eventApiSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(8).max(20),
  email: z.string().email(),
  eventDate: z.string(), // ISO string from frontend
  adultsCount: z.string(),
  childrenCount: z.string().optional(),

  // Single-choice fields
  cateringStyle: z.string().optional(),
  decoration: z.string().optional(),
  invitations: z.string().optional(),
  honeymoon: z.string().optional(),
  weddingNight: z.string().optional(),
  overnightStaying: z.string().optional(),
  trouse_de_marie: z.string().optional(),

  // Multi-choice fields
  venues: z.array(z.string()).optional(),
  entertainment: z.array(z.string()).optional(),
  photography: z.array(z.string()).optional(),
  beauty: z.array(z.string()).optional(),
  transport: z.array(z.string()).optional(),
  clothingRental: z.array(z.string()).optional(),
});

// 2️⃣ Event option types
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

// 3️⃣ POST handler
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate incoming data
    const data = eventApiSchema.parse(body);

    const supabase = createServerSupabase();

    // 1️⃣ Insert main event
    const { data: event, error: eventError } = await supabase
      .from("events")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        event_date: new Date(data.eventDate).toISOString(),
        adults_count: Number(data.adultsCount),
        children_count: data.childrenCount ? Number(data.childrenCount) : null,
      })
      .select()
      .single();

    if (eventError) throw eventError;

    // 2️⃣ Build event options array
    const options = [
      ...(data.venues ?? []).map(v => ({ type: EventOptionType.VENUES, value: v })),
      ...(data.cateringStyle ? [data.cateringStyle] : []).map(v => ({ type: EventOptionType.CATERING_STYLE, value: v })),
      ...(data.entertainment ?? []).map(v => ({ type: EventOptionType.ENTERTAINMENT, value: v })),
      ...(data.decoration ? [data.decoration] : []).map(v => ({ type: EventOptionType.DECORATION, value: v })),
      ...(data.photography ?? []).map(v => ({ type: EventOptionType.PHOTOGRAPHY, value: v })),
      ...(data.beauty ?? []).map(v => ({ type: EventOptionType.BEAUTY, value: v })),
      ...(data.transport ?? []).map(v => ({ type: EventOptionType.TRANSPORT, value: v })),
      ...(data.invitations ? [data.invitations] : []).map(v => ({ type: EventOptionType.INVITATIONS, value: v })),
      ...(data.clothingRental ?? []).map(v => ({ type: EventOptionType.CLOTHING_RENTAL, value: v })),
      ...(data.honeymoon ? [data.honeymoon] : []).map(v => ({ type: EventOptionType.HONEYMOON, value: v })),
      ...(data.weddingNight ? [data.weddingNight] : []).map(v => ({ type: EventOptionType.WEDDING_NIGHT, value: v })),
      ...(data.overnightStaying ? [data.overnightStaying] : []).map(v => ({ type: EventOptionType.OVERNIGHT_STAYING, value: v })),
      ...(data.trouse_de_marie ? [data.trouse_de_marie] : []).map(v => ({ type: EventOptionType.TROUSE_DE_MARIE, value: v })),
    ].map(opt => ({
      ...opt,
      event_id: event.id,
    }));

    // 3️⃣ Insert options into table
    if (options.length > 0) {
      const { error: optionsError } = await supabase
        .from("event_options")
        .insert(options);

      if (optionsError) throw optionsError;
    }

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message ?? "Failed to create event" }, { status: 400 });
  }
}

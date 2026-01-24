"use client";
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContex';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, User, Phone, Mail, Users, UtensilsCrossed, Camera, FileText, MapPin, House, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {  Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import mosaicBg3 from '@/assets/mosaic-bg-3.jpeg';
import { RadioGroupField } from './RadioGroupFields';


const meetingFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  phone: z.string().min(8, 'Valid phone required').max(20),
  email: z.string().email('Valid email required'),
  eventDate: z.date({ message: 'Event date is required' }),
  attendeesCount: z.string().min(1),
 
  badges: z.boolean().optional(),
  photography: z.array(z.string()).optional(),
  venues: z.string().optional(),
  restaurant: z.string().optional(),
  overnightStaying: z.string().optional(),
  transport: z.array(z.string()).optional(),
});

type MeetingFormData = z.infer<typeof meetingFormSchema>;




const MeetingBookingForm: React.FC = () => {
  const { t } = useLanguage();
  const [date, setDate] = React.useState<Date>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      badges: false,
      photography: [],
    },
  });

const formatList = (list?: string[]) =>
  list && list.length ? list.join(", ") : "Not specified";

const onSubmit = async (data: MeetingFormData) => {
  try {
    setIsSubmitting(true);

    const meetingDate = data.eventDate.toLocaleDateString("fr-FR");

    // Create meeting
    const res1 = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        eventDate: data.eventDate.toISOString(),
      }),
    });

    if (!res1.ok) throw new Error("Failed to create meeting");

    // 📧 Email body
    const emailText = `
📅 NEW MEETING RESERVATION

👤 Organizer Information
------------------------
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}

🗓 Meeting Details
------------------------
Meeting Date: ${meetingDate}
Number of Attendees: ${data.attendeesCount}

🏷 Services & Options
------------------------
Badges Required: ${data.badges ? "Yes" : "No"}
Photography: ${formatList(data.photography)}
Venue: ${data.venues || "Not specified"}
Restaurant: ${data.restaurant || "Not specified"}
Overnight Staying: ${data.overnightStaying || "Not specified"}
Transport: ${formatList(data.transport)}
`;

    // Send email
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Réservation de Meeting",
        text: emailText,
      }),
    })

    if (!res.ok) throw new Error("Failed to send email");

    toast.success("Meeting booked successfully!");
    form.reset();
    setDate(undefined)

  } catch (error) {
    toast.error("Error in creating a meeting booking");
  } finally {
    setIsSubmitting(false);
  }
};



     const CheckboxGroup = ({ 
       name, 
       options, 
       icon: Icon 
     }: { 
       name: keyof MeetingFormData; 
       options: { value: string; label: string }[];
       icon?: React.ElementType;
     }) => (
       <div className="flex flex-wrap gap-3">
         {options.map((option) => (
           <label
             key={option.value}
             className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
           >
             <Checkbox
               checked={(form.watch(name) as string[] || []).includes(option.value)}
               onCheckedChange={(checked) => {
                 const current = (form.getValues(name) as string[]) || [];
                 if (checked) {
                   form.setValue(name, [...current, option.value] as any);
                 } else {
                   form.setValue(name, current.filter((v) => v !== option.value) as any);
                 }
               }}
             />
             <span className="text-sm">{option.label}</span>
           </label>
         ))}
       </div>
     );

       const CheckboxGroup1 =  ({
       name,
       options,
       icon: Icon,
     }: {
       name: keyof MeetingFormData;
       options: { value: string; label: string }[];
       icon?: React.ElementType;
     }) => (
       <div className="flex flex-wrap gap-3">
         {options.map((option) => (
           <label
             key={option.value}
             className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-secondary/50 cursor-pointer transition-colors
             has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
           >
             <Checkbox
               checked={form.watch(name) === option.value}
               onCheckedChange={(checked) => {
                 if (checked) {
                   form.setValue(name, option.value as any);
                 }
               }}
             />
             <span className="text-sm">{option.label}</span>
           </label>
         ))}
       </div>
     );
   

  return (
    <section id="meeting-booking" className="py-20 relative overflow-hidden">
      {/* Background mosaic */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosaicBg3})` }}
      />
      <div className="absolute inset-0 bg-background/90" />
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <Card className="card-elegant overflow-hidden">
          {/* Header with Islamic pattern */}
          <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 islamic-pattern">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="relative">
              <CardTitle className="text-3xl md:text-4xl mb-2">{t.meetingForm.title}</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                {t.meetingForm.subtitle}
              </CardDescription>
            </div>
          </div>

          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.meetingForm.personalInfo}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="meetingFullName">{t.meetingForm.fullName}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="meetingFullName"
                        className="pl-10"
                        {...form.register('fullName')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meetingPhone">{t.meetingForm.phone}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="meetingPhone"
                        type="tel"
                        className="pl-10"
                        {...form.register('phone')}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="meetingEmail">{t.meetingForm.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="meetingEmail"
                        type="email"
                        className="pl-10"
                        {...form.register('email')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.meetingForm.eventDetails}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{t.meetingForm.eventDate}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : t.common.selectDate}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            setDate(d);
                            if (d) form.setValue('eventDate', d);
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendeesCount">{t.meetingForm.attendeesCount}</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="attendeesCount"
                        type="number"
                        min="1"
                        className="pl-10"
                        {...form.register('attendeesCount')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Catering */}
               <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.meetingForm.catering}</h3>
                </div>
                <div className="space-y-2">
                   <RadioGroupField
                                     form={form}
                  name="restaurant"
                  options={[
                   { value: '', label: t.nothing },
                    { value: 'meetingroom', label: t.meetingForm.restaurantOptions.inmeeting },
                    { value: 'amphitheater', label: t.meetingForm.restaurantOptions.emporter },
                   
                   
                  ]}
                />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.meetingForm.venue}</h3>
                </div>
                <RadioGroupField
                                  form={form}
                  name="venues"
                  options={[
                   { value: '', label: t.nothing },
                    { value: 'meetingroom', label: t.meetingForm.venueOptions.meetingroom },
                    { value: 'amphitheater', label: t.meetingForm.venueOptions.amphitheater },
                   
                   
                  ]}
                />
              </div>

              {/* Invitations */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.meetingForm.badge}</h3>
                </div>
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-accent/10 has-[:checked]:border-accent">
                  <Checkbox
                    checked={form.watch('badges')}
                    onCheckedChange={(checked) => form.setValue('badges', !!checked)}
                  />
                  <span>{t.meetingForm.badge}</span>
                </label>
              </div>

              {/* Photography */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Camera className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.meetingForm.photography}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'photos', label: t.meetingForm.photos },
                    { value: 'video', label: t.meetingForm.video },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                    >
                      <Checkbox
                        checked={(form.watch('photography') || []).includes(option.value)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues('photography') || [];
                          if (checked) {
                            form.setValue('photography', [...current, option.value]);
                          } else {
                            form.setValue('photography', current.filter((v) => v !== option.value));
                          }
                        }}
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
               {/* Overnight stay */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 pb-3 border-b border-border">
                                <House className="w-5 h-5 text-primary" />
                                <h3 className="text-xl font-semibold">{t.eventForm.overnightStaying}</h3>
                              </div>
                              <RadioGroupField
                                                form={form}
                                name="overnightStaying"
                                options={[
                                  { value: '', label: t.nothing },
                                  { value: 'with', label: t.eventForm.overnightStay.with },
                                  { value: 'without', label: t.eventForm.overnightStay.without },
                               
                                ]}
                              />
                            </div>

                 {/* Transport */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.transport}</h3>
                </div>
                <CheckboxGroup
                  name="transport"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'car', label: t.eventForm.car },
                  
                    { value: 'minibus', label: t.eventForm.minibus },
                    { value: 'bus', label: t.eventForm.bus },
                  ]}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6 rounded-xl transition-all duration-300"
              >
                {t.meetingForm.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MeetingBookingForm;

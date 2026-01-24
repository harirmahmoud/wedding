import React from 'react';
import { useLanguage } from '@/contexts/LanguageContex';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, User, Phone, Mail, MapPin, UtensilsCrossed, Music, Palette, Camera, Sparkles, Car, FileText, Shirt, Plane, Moon, House, Luggage } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import mosaicBg4 from '@/assets/mosaic-bg-4.jpeg';
import { GiAmpleDress } from "react-icons/gi";
import { is, se } from 'date-fns/locale';
import { RadioGroupField } from './RadioGroupFields';


const eventFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  phone: z.string().min(8, 'Valid phone required').max(20),
  email: z.string().email('Valid email required'),
  eventDate: z.date().nullable().refine((date) => date !== null, {
    message: 'Event date is required',
  }),
  adultsCount: z.string().min(1),
  childrenCount: z.string().optional(),
  venues: z.array(z.string()).optional(),
  cateringStyle: z.string().optional(),
  entertainment: z.array(z.string().optional()),
  decoration: z.string().optional(),
  photography: z.array(z.string().optional()),
  beauty: z.array(z.string().optional()),
  transport: z.array(z.string().optional()),
  invitations: z.string().optional(),
  clothingRental: z.array(z.string().optional()),
  honeymoon: z.string().optional(),
  weddingNight: z.string().optional(),
  overnightStaying: z.string().optional(),
  trouse_de_marie: z.string().optional(),
});

type EventFormData = z.infer<typeof eventFormSchema>;

const EventBookingForm: React.FC = () => {
  const { t } = useLanguage();
  const [date, setDate] = React.useState<Date>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      venues: [],
      
      entertainment: [],
     
      photography: [],
      beauty: [],
      transport: [],
      
      clothingRental: [],
      
     
    },
  });

const formatList = (list?: (string | undefined)[]) =>
  list && list.length ? list.filter(Boolean).join(", ") : "Not specified";

const onSubmit = async (data: EventFormData) => {
  try {
    setIsSubmitting(true);

    const eventDate = data.eventDate
      ? data.eventDate.toLocaleDateString("fr-FR")
      : "Not specified";

    // Create event
    const res1 = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        eventDate: data.eventDate?.toISOString(),
      }),
    });

    if (!res1.ok) throw new Error("Failed to create event");

    // 📧 Email body (TEXT)
    const emailText = `
📅 NEW EVENT RESERVATION

👤 Client Information
-------------------
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}

🗓 Event Details
-------------------
Event Date: ${eventDate}
Adults Count: ${data.adultsCount}
Children Count: ${data.childrenCount || "0"}

📍 Venue & Services
-------------------
Venues: ${formatList(data.venues)}
Catering Style: ${data.cateringStyle || "Not specified"}
Decoration: ${data.decoration || "Not specified"}
Invitations: ${data.invitations || "Not specified"}

🎶 Entertainment
-------------------
Entertainment: ${formatList(data.entertainment)}
Photography: ${formatList(data.photography)}
Beauty Services: ${formatList(data.beauty)}
Transport: ${formatList(data.transport)}
Clothing Rental: ${formatList(data.clothingRental)}

💍 Wedding Options
-------------------
Honeymoon: ${data.honeymoon || "Not specified"}
Wedding Night: ${data.weddingNight || "Not specified"}
Overnight Staying: ${data.overnightStaying || "Not specified"}
Trousseau de Marie: ${data.trouse_de_marie || "Not specified"}
`;

    // Send email
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Réservation de Meeting",
        text: emailText,
      }),
    });

    if (!res.ok) throw new Error("Failed to send email");

    toast.success("Event booked successfully!");
    form.reset();
    setDate(undefined);

  } catch (error) {
    toast.error("Error in creating a booking");
  } finally {
    setIsSubmitting(false);
  }
};

  const CheckboxGroup = ({ 
    name, 
    options, 
    icon: Icon 
  }: { 
    name: keyof EventFormData; 
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
  name: keyof EventFormData;
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
    <section id="event-booking" className="py-20 relative overflow-hidden">
      {/* Background mosaic */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosaicBg4})` }}
      />
      <div className="absolute inset-0 bg-background/90" />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <Card className="card-elegant overflow-hidden">
          {/* Header with Islamic pattern */}
          <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 islamic-pattern">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="relative">
              <CardTitle className="text-3xl md:text-4xl mb-2">{t.eventForm.title}</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                {t.eventForm.subtitle}
              </CardDescription>
            </div>
          </div>

          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.personalInfo}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.eventForm.fullName}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="fullName" 
                        className="pl-10"
                        {...form.register('fullName')} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.eventForm.phone}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        type="tel"
                        className="pl-10"
                        {...form.register('phone')} 
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email">{t.eventForm.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="email" 
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
                  <h3 className="text-xl font-semibold">{t.eventForm.eventDetails}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>{t.eventForm.eventDate}</Label>
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
                    <Label htmlFor="adultsCount">{t.eventForm.adultsCount}</Label>
                    <Input 
                      id="adultsCount" 
                      type="number"
                      min="1"
                      {...form.register('adultsCount')} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childrenCount">{t.eventForm.childrenCount}</Label>
                    <Input 
                      id="childrenCount" 
                      type="number"
                      min="0"
                      {...form.register('childrenCount')} 
                    />
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.venue}</h3>
                </div>
                <CheckboxGroup
                  name="venues"
                  options={[
                    { value: 'hall', label: t.eventForm.venueOptions.hall },
                    { value: 'garden', label: t.eventForm.venueOptions.garden },
                    { value: 'pool', label: t.eventForm.venueOptions.pool },
                    { value: 'beach', label: t.eventForm.venueOptions.beach },
                    { value: 'yacht', label: t.eventForm.venueOptions.yacht },
                    { value: 'birthday', label: t.eventForm.venueOptions.birthday },
                  ]}
                />
              </div>

              {/* Catering */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.catering}</h3>
                </div>
                <Label className="text-muted-foreground">{t.eventForm.cateringStyle}</Label>
                <RadioGroupField
                  form={form}
                  name="cateringStyle"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'traditional', label: t.eventForm.traditional },
                    { value: 'modern', label: t.eventForm.modern },
                    { value: 'healthy', label: t.eventForm.healthy },
                   
                  ]}
                />
              </div>

              {/* Clothing Rental */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <GiAmpleDress className="w-5 h-5 text-primary" />
                  
                  <h3 className="text-xl font-semibold">{t.eventForm.clothingRental}</h3>
                </div>
                <CheckboxGroup
                  name="clothingRental"
                  options={[
                    { value: 'weddingDress', label: t.eventForm.weddingDress },
                    { value: 'traditionalOutfit', label: t.eventForm.traditionalOutfit },
                    { value: 'suit', label: t.eventForm.suit },
                  ]}
                />
              </div>

              {/* Entertainment */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Music className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.entertainment}</h3>
                </div>
                <Label className="text-muted-foreground mb-2">{t.eventForm.entertainmentGeneral}</Label>
                <CheckboxGroup
                  name="entertainment"
                  options={[
                    { value: 'show', label: t.eventForm.show },
                    { value: 'modernMusic', label: t.eventForm.modernMusic },
                    { value: 'dj', label: t.eventForm.dj },
                    { value: 'ray', label: t.eventForm.ray },
                    { value: 'joker', label: t.eventForm.joker },
                  ]}
                />
                <Label className="text-muted-foreground mt-4 mb-2">{t.eventForm.traditionalMusic}</Label>
                <CheckboxGroup
                  name="entertainment"
                  options={[
                    { value: 'malouf', label: t.eventForm.malouf },
                    { value: 'fkairat', label: t.eventForm.fkairat },
                    { value: 'hawzi', label: t.eventForm.hawzi },
                    { value: 'madahet', label: t.eventForm.madahet },
                    { value: 'chaabi', label: t.eventForm.chaabi },
                    { value: 'targi', label: t.eventForm.targi },
                    { value: 'kabil', label: t.eventForm.kabil },
                    { value: 'chawi', label: t.eventForm.chawi },
                    
                    
                  ]}
                />
              </div>

              {/* Decoration */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Palette className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.decoration}</h3>
                </div>
                <RadioGroupField
                  form={form}
                  name="decoration"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'flowers', label: t.eventForm.flowerTheme },
                    { value: 'royal', label: t.eventForm.royalTheme },
                  ]}
                />
              </div>

              {/* Photography */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Camera className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.photography}</h3>
                </div>
                <CheckboxGroup
                  name="photography"
                  options={[
                    { value: 'photos', label: t.eventForm.photos },
                    { value: 'video', label: t.eventForm.video },
                  ]}
                />
              </div>

              {/* Beauty */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.beauty}</h3>
                </div>
                <CheckboxGroup
                  name="beauty"
                  options={[
                    { value: 'makeup', label: t.eventForm.makeup },
                    { value: 'hairdresser', label: t.eventForm.hairdresser },
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
                    { value: 'car', label: t.eventForm.car },
                    { value: 'motorcycle', label: t.eventForm.motorcycle },
                    { value: 'horse', label: t.eventForm.horse },
                    { value: 'limousine', label: t.eventForm.limousine },
                    { value: 'minibus', label: t.eventForm.minibus },
                    { value: 'bus', label: t.eventForm.bus },
                  ]}
                />
              </div>

             

              {/* Invitations */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.invitations}</h3>
                </div>
                <RadioGroupField
                  form={form}
                  name="invitations"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'simple', label: t.eventForm.simple },
                    { value: 'modern', label: t.eventForm.modern },
                   
                  ]}
                />
              </div>

              {/* Honeymoon */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Plane className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.honeymoon}</h3>
                </div>
                <RadioGroupField
                  form={form}
                  name="honeymoon"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'inCountry', label: t.eventForm.inAlgeria },
                    { value: 'abroad', label: t.eventForm.abroad },
                  ]}
                />
              </div>

              {/* Wedding Night */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Moon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.weddingNight}</h3>
                </div>
                <RadioGroupField
                  form={form}
                  name="weddingNight"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'hotel', label: t.eventForm.hotel },
                    { value: 'villa', label: t.eventForm.villa },
                    { value: 'suite', label: t.eventForm.suite },
                  ]}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Luggage className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{t.eventForm.trouse_de_marie}</h3>
                </div>
                <RadioGroupField
                  form={form}
                  name="trouse_de_marie"
                  options={[
                    { value: '', label: t.nothing },
                    { value: 'modern', label: t.eventForm.modern },
                    { value: 'traditional', label: t.eventForm.traditional },
                    
                  ]}
                />
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-6 rounded-xl"
                onClick={form.handleSubmit(onSubmit)}
              >
                {t.eventForm.submit}
              </Button>
               
            </form>
          </CardContent>
        </Card>
      </div>
    
    </section>
  );
};

export default EventBookingForm;

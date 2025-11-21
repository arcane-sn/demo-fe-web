'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getBusinessInfoSchema, type BusinessInfoSchemaType } from '../../../core/schemas';
import { PublicFlag } from '@/components/ui/public-flag';

export function BusinessInfoForm() {
  const form = useForm<BusinessInfoSchemaType>({
    resolver: zodResolver(getBusinessInfoSchema()),
    defaultValues: {
      profile: {
        companyName: '',
        brandName: '',
        phoneNumber: '',
        email: '',
        businessType: '',
        businessIndustry: '',
        website: ''
      },
      address: {
        address: '',
        country: 'Indonesia',
        province: '',
        city: '',
        district: '',
        subDistrict: '',
        postalCode: '',
        legalAddressSame: true,
        legalAddress: '',
        legalCountry: '',
        legalProvince: '',
        legalCity: '',
        legalDistrict: '',
        legalSubDistrict: '',
        legalPostalCode: ''
      },
      characteristics: {
        businessModel: '',
        corporateTaxType: '',
        currentMonthlySales: '',
        estimatedMonthlySales: '',
        averageEstimatedRevenue: '',
        transferService: false,
        transferUseCase: '',
        transferVolume: ''
      },
      bank: {
        bankNameCode: '',
        accountNumber: '',
        accountName: ''
      }
    }
  });

  const onSubmit = (data: BusinessInfoSchemaType) => {
    // TODO: Implement form submission
  };

  // Watch legalAddressSame and business address fields
  const legalAddressSame = form.watch('address.legalAddressSame');
  const businessAddress = form.watch('address.address');
  const businessCountry = form.watch('address.country');
  const businessProvince = form.watch('address.province');
  const businessCity = form.watch('address.city');
  const businessDistrict = form.watch('address.district');
  const businessSubDistrict = form.watch('address.subDistrict');
  const businessPostalCode = form.watch('address.postalCode');

  // Sync legal address with business address when toggle is ON
  useEffect(() => {
    if (legalAddressSame) {
      form.setValue('address.legalAddress', businessAddress);
      form.setValue('address.legalCountry', businessCountry);
      form.setValue('address.legalProvince', businessProvince);
      form.setValue('address.legalCity', businessCity);
      form.setValue('address.legalDistrict', businessDistrict);
      form.setValue('address.legalSubDistrict', businessSubDistrict);
      form.setValue('address.legalPostalCode', businessPostalCode);
    }
  }, [legalAddressSame, businessAddress, businessCountry, businessProvince, businessCity, businessDistrict, businessSubDistrict, businessPostalCode, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Business Profile Section */}
        <Card id='business-profile'>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Company Name */}
            <FormField
              control={form.control}
              name="profile.companyName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Company Name
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="profile.brandName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Brand Name
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder="Brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Business Phone Number */}
            <FormField
              control={form.control}
              name="profile.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Phone Number
                    </FormLabel>
                    <div className="flex gap-2 flex-1">
                      <Select defaultValue="+62">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="+62">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="+62" size={12} />
                                <span>+62</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="+1">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="+1" size={12} />
                                <span>+1</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="+44">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="+44" size={12} />
                                <span>+44</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="+65">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="+65" size={12} />
                                <span>+65</span>
                              </div>
                            </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 81234567890" 
                          type="tel"
                          {...field}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Business Email */}
            <FormField
              control={form.control}
              name="profile.email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Email
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input type="email" placeholder="email@domain.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Business Type */}
            <FormField
              control={form.control}
              name="profile.businessType"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Type
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small-micro">Small & Micro Business</SelectItem>
                          <SelectItem value="enterprise">Enterprise/Corporate</SelectItem>
                       
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Business Industry */}
            <FormField
              control={form.control}
              name="profile.businessIndustry"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Industry
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Website */}
            <FormField
              control={form.control}
              name="profile.website"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Website
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder="domain.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Business Address Section */}
        <Card id='business-address'>
          <CardHeader>
            <CardTitle>Business Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Business Address */}
            <FormField
              control={form.control}
              name="address.address"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Address
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder="Input business address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Country
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Indonesia">
                            <div className="flex items-center gap-2">
                              <PublicFlag countryCode="Indonesia" size={14} />
                              <span>Indonesia</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Singapore">
                            <div className="flex items-center gap-2">
                              <PublicFlag countryCode="Singapore" size={14} />
                              <span>Singapore</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Malaysia">
                            <div className="flex items-center gap-2">
                              <PublicFlag countryCode="Malaysia" size={14} />
                              <span>Malaysia</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Thailand">
                            <div className="flex items-center gap-2">
                              <PublicFlag countryCode="Thailand" size={14} />
                              <span>Thailand</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Province */}
            <FormField
              control={form.control}
              name="address.province"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Province
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                          <SelectItem value="west-java">West Java</SelectItem>
                          <SelectItem value="central-java">Central Java</SelectItem>
                          <SelectItem value="east-java">East Java</SelectItem>
                          <SelectItem value="bali">Bali</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      City
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                          <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                          <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
                          <SelectItem value="jakarta-utara">Jakarta Utara</SelectItem>
                          <SelectItem value="jakarta-timur">Jakarta Timur</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* District */}
            <FormField
              control={form.control}
              name="address.district"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      District
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="menteng">Menteng</SelectItem>
                          <SelectItem value="tanah-abang">Tanah Abang</SelectItem>
                          <SelectItem value="cikini">Cikini</SelectItem>
                          <SelectItem value="gambir">Gambir</SelectItem>
                          <SelectItem value="kemayoran">Kemayoran</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Sub-District */}
            <FormField
              control={form.control}
              name="address.subDistrict"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Sub-District
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sub-district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="menteng">Menteng</SelectItem>
                          <SelectItem value="pegangsaan">Pegangsaan</SelectItem>
                          <SelectItem value="cikini">Cikini</SelectItem>
                          <SelectItem value="gondangdia">Gondangdia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Postal Code */}
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Postal Code
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder="Input postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Legal Address Switch */}
            <FormField
              control={form.control}
              name="address.legalAddressSame"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Legal Address
                    </FormLabel>
                    <div className="flex items-center space-x-2 flex-1">
                      <FormLabel className="text-sm font-normal">
                        Legal Address Same as Business Address
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Legal Address Fields - Only show when toggle is OFF */}
            {!legalAddressSame && (
              <div className="space-y-4 pt-8">
              {/* Legal Address */}
              <FormField
                control={form.control}
                name="address.legalAddress"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        Legal Address
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input placeholder="Input business address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Legal Country */}
              <FormField
                control={form.control}
                name="address.legalCountry"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        Country
                      </FormLabel>
                      <div className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Indonesia">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="Indonesia" size={14} />
                                <span>Indonesia</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Singapore">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="Singapore" size={14} />
                                <span>Singapore</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Malaysia">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="Malaysia" size={14} />
                                <span>Malaysia</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Thailand">
                              <div className="flex items-center gap-2">
                                <PublicFlag countryCode="Thailand" size={14} />
                                <span>Thailand</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Legal Province */}
              <FormField
                control={form.control}
                name="address.legalProvince"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        Province
                      </FormLabel>
                      <div className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                            <SelectItem value="west-java">West Java</SelectItem>
                            <SelectItem value="central-java">Central Java</SelectItem>
                            <SelectItem value="east-java">East Java</SelectItem>
                            <SelectItem value="bali">Bali</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Legal City */}
              <FormField
                control={form.control}
                name="address.legalCity"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        City
                      </FormLabel>
                      <div className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                            <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                            <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
                            <SelectItem value="jakarta-utara">Jakarta Utara</SelectItem>
                            <SelectItem value="jakarta-timur">Jakarta Timur</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Legal District */}
              <FormField
                control={form.control}
                name="address.legalDistrict"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        District
                      </FormLabel>
                      <div className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="menteng">Menteng</SelectItem>
                            <SelectItem value="tanah-abang">Tanah Abang</SelectItem>
                            <SelectItem value="cikini">Cikini</SelectItem>
                            <SelectItem value="gambir">Gambir</SelectItem>
                            <SelectItem value="kemayoran">Kemayoran</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Legal Sub-District */}
              <FormField
                control={form.control}
                name="address.legalSubDistrict"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        Sub-District
                      </FormLabel>
                      <div className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sub-district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="menteng">Menteng</SelectItem>
                            <SelectItem value="pegangsaan">Pegangsaan</SelectItem>
                            <SelectItem value="cikini">Cikini</SelectItem>
                            <SelectItem value="gondangdia">Gondangdia</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Legal Postal Code */}
              <FormField
                control={form.control}
                name="address.legalPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormLabel className="w-48 text-left text-sm font-normal">
                        Postal Code
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input placeholder="Input postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Characteristics Section */}
        <Card id='business-characteristics'>
          <CardHeader>
            <CardTitle>Business Characteristics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-10">
            {/* Business Model */}
            <div className='space-y-6 border-b-1 pb-10'>
              <h3 className="text-sm font-bold pl-5">1. Characteristics Info</h3>
            
            <FormField
              control={form.control}
              name="characteristics.businessModel"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Business Model
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="b2b">B2B</SelectItem>
                          <SelectItem value="b2c">B2C</SelectItem>
                          <SelectItem value="b2b2c">B2B2C</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Corporate Tax Type */}
            <FormField
              control={form.control}
              name="characteristics.corporateTaxType"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Corporate Tax Type
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tax type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pkp">PKP</SelectItem>
                          <SelectItem value="non-pkp">Non-PKP</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            </div>

            <div className='space-y-6 border-b-1 pb-10'>
              <h3 className="text-sm font-bold pl-5 ">2. Sales & Revenue</h3>
            

            {/* Current Monthly Sales */}
            <FormField
              control={form.control}
              name="characteristics.currentMonthlySales"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Current Monthly Sales
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="IDR 0" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-10m">IDR 0 - 10 Million</SelectItem>
                          <SelectItem value="10m-50m">IDR 10 - 50 Million</SelectItem>
                          <SelectItem value="50m-100m">IDR 50 - 100 Million</SelectItem>
                          <SelectItem value="100m+">IDR 100 Million+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Estimated Monthly Sales */}
            <FormField
              control={form.control}
              name="characteristics.estimatedMonthlySales"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Estimated Monthly Sales
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="IDR 0" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-10m">IDR 0 - 10 Million</SelectItem>
                          <SelectItem value="10m-50m">IDR 10 - 50 Million</SelectItem>
                          <SelectItem value="50m-100m">IDR 50 - 100 Million</SelectItem>
                          <SelectItem value="100m+">IDR 100 Million+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Average Estimated Revenue */}
            <FormField
              control={form.control}
              name="characteristics.averageEstimatedRevenue"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Average Estimated Revenue
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="IDR 0" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-50k">IDR 0 - 50,000</SelectItem>
                          <SelectItem value="50k-100k">IDR 50,000 - 100,000</SelectItem>
                          <SelectItem value="100k-500k">IDR 100,000 - 500,000</SelectItem>
                          <SelectItem value="500k+">IDR 500,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            </div>

            <div className='space-y-6 pb-10'>
              <h3 className="text-sm font-bold pl-5  ">3. Transfer Info</h3>
            

            {/* Transfer Service */}
            <FormField
              control={form.control}
              name="characteristics.transferService"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Transfer Service
                    </FormLabel>
                    <div className="flex items-center space-x-2 flex-1">
                      <FormLabel className="text-sm">
                        My business use transfer service
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Transfer Use Case */}
            <FormField
              control={form.control}
              name="characteristics.transferUseCase"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Transfer Use Case
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transfer use case" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="payment">Regular Money Transfer</SelectItem>
                          <SelectItem value="disbursement">Special Money Transfer</SelectItem>
                         
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Transfer Volume */}
            <FormField
              control={form.control}
              name="characteristics.transferVolume"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Transfer Volume
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transfer volume" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-100">0 - 100 transactions</SelectItem>
                          <SelectItem value="101-500">101 - 500 transactions</SelectItem>
                          <SelectItem value="501-1000">501 - 1000 transactions</SelectItem>
                          <SelectItem value="1000+">1000+ transactions</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
                
              )}
            />
            </div>
          </CardContent>
        </Card>

        {/* Bank Information Section */}
        <Card id='bank-info'>
          <CardHeader>
            <CardTitle>Bank Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Bank Name/Code */}
            <FormField
              control={form.control}
              name="bank.bankNameCode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Bank Name / Code
                    </FormLabel>
                    <div className="flex-1">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select or search bank name / code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bca">Bank Central Asia (BCA) - 014</SelectItem>
                          <SelectItem value="bri">Bank Rakyat Indonesia (BRI) - 002</SelectItem>
                          <SelectItem value="bni">Bank Negara Indonesia (BNI) - 009</SelectItem>
                          <SelectItem value="mandiri">Bank Mandiri - 008</SelectItem>
                          <SelectItem value="cimb">CIMB Niaga - 022</SelectItem>
                          <SelectItem value="permata">Bank Permata - 013</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Account Number */}
            <FormField
              control={form.control}
              name="bank.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Account Number 
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input 
                          placeholder="Input account number" 
                          type="tel"
                          {...field}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Account Name */}
            <FormField
              control={form.control}
              name="bank.accountName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-medium">
                      Account Name 
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input 
                          placeholder="Input account name" 
                          {...field}
                          onChange={(e) => {
                            // Only allow alphanumeric, space, and dot
                            const value = e.target.value.replace(/[^a-zA-Z0-9 .]/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
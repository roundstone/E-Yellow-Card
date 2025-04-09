import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";

// const vaccineList = [
//   "Yellow Fever Vaccine",
//   "Yellow Fever (Lifetime)",
//   "Tetanus",
//   "CSM",
//   "Small Pox",
//   "OPV",
// ];

const VaccineSchema = z.object({
  vaccines: z.array(z.number()).min(1, "Please select at least one vaccine"),
});

const VaccinationForm = ({ onSuccess, vToggleVForm, userVaccines }: { onSuccess: (data) => void, vToggleVForm: () => void, userVaccines: any }) => {
  const defaultVaccineIds = userVaccines ? userVaccines.map(vaccine => vaccine.id) : [];

  const form = useForm<z.infer<typeof VaccineSchema>>({
    resolver: zodResolver(VaccineSchema),
    defaultValues: {
      vaccines: defaultVaccineIds,
    },
  });

  const [vaccinesData, setVaccinesData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function onSubmit(data: z.infer<typeof VaccineSchema>) {
    // toast.success("Vaccination info updated successfully!");
    console.log("Selected Vaccines:", data.vaccines);
    onSuccess(data);
  }

  const fetchVaccineData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("registrar/vaccine/list", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setVaccinesData(response.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccineData();
  }, []);

  return (
    <Form {...form}>
      { loading ? <Loading /> : '' }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Button 
          onClick={() => vToggleVForm()}
          variant="outline"
          size="sm"
        >
          Cancel
        </Button>
        <FormField
          control={form.control}
          name="vaccines"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="border rounded-lg p-4 grid grid-cols-2">
                  {vaccinesData.map((vaccine) => (
                    <label
                      key={vaccine.id}
                      className="flex items-center space-x-3 py-4"
                    >
                      <Checkbox
                        checked={field.value.includes(vaccine.id)}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, vaccine.id])
                            : field.onChange(
                                field.value.filter((id) => id !== vaccine.id)
                              )
                        }
                      />
                      <span>{vaccine.vaccineName}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" text-white">
          Update Vaccination Info
        </Button>
      </form>
    </Form>
  );
};

export default VaccinationForm;

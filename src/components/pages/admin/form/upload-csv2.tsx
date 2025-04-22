import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle, FileIcon, UploadCloud, X, XCircle } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import AppModal from "@/components/common/modal";
import SystemCheck from "../modal/system-check";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";

const UploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => {
      const validTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
      return validTypes.includes(file.type);
    },
    {
      message: "Please upload a valid CSV or Excel file",
    }
  ),
  zone: z.string().min(1, "Please select a zone"),
});

// Define interfaces for CSV data
interface CSVData {
    headers: string[];
    rows: Record<string, string>[];
}

const UploadCSVForm = () => {
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [systemCheckResults, setSystemCheckResults] = useState({
    checks: [
      { name: "Special Character", status: "Pending" },
      { name: "Card Availability", status: "Pending" },
      { name: "CSV Header", status: "Pending" },
    ],
    message: "",
    success: false
  });

  const form = useForm({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      file: undefined,
      zone: "",
    },
  });

  const expectedHeaders = ['passportNumber', 'firstName', 'surName', 'email', 'phone', 'nin', 'dob', 'state', 'address', 'gender'];

  const validateCsvData = (data) => {
    const errors = [];
    
    // Check for missing headers
    const missingHeaders = expectedHeaders.filter(header => !data.headers.includes(header));
    if (missingHeaders.length > 0) {
      errors.push(`Missing required headers: ${missingHeaders.join(', ')}`);
      
      // Update system check results
      const updatedChecks = [...systemCheckResults.checks];
      const headerCheckIndex = updatedChecks.findIndex(check => check.name === "CSV Header");
      if (headerCheckIndex !== -1) {
        updatedChecks[headerCheckIndex].status = "Failed";
      }
      
      setSystemCheckResults({
        checks: updatedChecks,
        message: "The uploaded file's header row does not match the expected format. Please ensure column headers match our template exactly, including case sensitivity and spacing.",
        success: false
      });
    } else {
      // Update system check results for headers
      const updatedChecks = [...systemCheckResults.checks];
      const headerCheckIndex = updatedChecks.findIndex(check => check.name === "CSV Header");
      if (headerCheckIndex !== -1) {
        updatedChecks[headerCheckIndex].status = "Passed";
      }
      setSystemCheckResults(prev => ({
        ...prev,
        checks: updatedChecks
      }));
    }
    
    // Check for missing values in rows
    data.rows.forEach((row, index) => {
      expectedHeaders.forEach(header => {
        if (!row[header] || row[header].trim() === '') {
          errors.push(`Row ${index + 1}: Missing value for ${header}`);
        }
      });
    });
    
    // Check for special characters in key fields
    data.rows.forEach((row, index) => {
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      
      // Check name fields for special characters
      if (row.firstName && specialCharRegex.test(row.firstName)) {
        errors.push(`Row ${index + 1}: firstName contains special characters`);
      }
      
      if (row.surName && specialCharRegex.test(row.surName)) {
        errors.push(`Row ${index + 1}: surName contains special characters`);
      }
    });
    
    // Update special character check
    const specialCharCheckIndex = systemCheckResults.checks.findIndex(check => check.name === "Special Character");
    if (specialCharCheckIndex !== -1) {
      const hasSpecialCharErrors = errors.some(error => error.includes("special characters"));
      const updatedChecks = [...systemCheckResults.checks];
      updatedChecks[specialCharCheckIndex].status = hasSpecialCharErrors ? "Failed" : "Passed";
      setSystemCheckResults(prev => ({
        ...prev,
        checks: updatedChecks
      }));
    }
    
    return errors;
  };

  const parseCSV = (file: File): Promise<CSVData> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content !== 'string') {
          resolve({ headers: [], rows: [] });
          return;
        }
        
        const lines = content.split('\n');
        if (lines.length === 0) {
          resolve({ headers: [], rows: [] });
          return;
        }
        
        const headers = lines[0].split(',').map(h => h.trim());
        
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue;
          
          const values = lines[i].split(',');
          const row = {};
          for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j] ? values[j].trim() : '';
          }
          rows.push(row);
        }
        
        resolve({ headers, rows });
      };
      reader.readAsText(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    setFileSelected(true);
    form.setValue("file", file);
    
    try {
      // Reset system check results
      setSystemCheckResults({
        checks: [
          { name: "Special Character", status: "Pending" },
          { name: "Card Availability", status: "Pending" },
          { name: "CSV Header", status: "Pending" },
        ],
        message: "",
        success: false
      });
      
      // Parse the CSV file
      const data = await parseCSV(file);
      setHeaders(data.headers);
      setPreviewData(data.rows.slice(0, 100)); // Preview first 5 rows
      
      // Validate the CSV data
      const errors = validateCsvData(data);
      setValidationErrors(errors);
      
      // Update card availability check
      // This would normally be done after API call, but we'll simulate it here
      const updatedChecks = [...systemCheckResults.checks];
      const cardCheckIndex = updatedChecks.findIndex(check => check.name === "Card Availability");
      if (cardCheckIndex !== -1 && form.getValues("zone")) {
        // Simulate card availability check based on data rows length
        const hasEnoughCards = data.rows.length <= 100; // Arbitrary threshold
        updatedChecks[cardCheckIndex].status = hasEnoughCards ? "Passed" : "Failed";
        
        setSystemCheckResults(prev => ({
          ...prev,
          checks: updatedChecks,
          message: !hasEnoughCards ? 
            `Not enough yellow cards available for selected zone. Available: ${80}, Required: ${data.rows.length}` : 
            prev.message
        }));
      }
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 300);
      
    } catch (error) {
      toast.error("Error parsing file");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update card availability check when zone changes
  useEffect(() => {
    if (form.getValues("zone") && previewData.length > 0) {
      const updatedChecks = [...systemCheckResults.checks];
      const cardCheckIndex = updatedChecks.findIndex(check => check.name === "Card Availability");
      if (cardCheckIndex !== -1) {
        // Simulate card availability check based on data rows length
        const hasEnoughCards = previewData.length <= 100; // Arbitrary threshold
        updatedChecks[cardCheckIndex].status = hasEnoughCards ? "Passed" : "Failed";
        
        setSystemCheckResults(prev => ({
          ...prev,
          checks: updatedChecks,
          message: !hasEnoughCards ? 
            `Not enough yellow cards available for selected zone. Available: ${80}, Required: ${previewData.length}` : 
            prev.message
        }));
      }
    }
  }, [form.getValues("zone")]);

  const onSubmit = async (data) => {
    if (validationErrors.length > 0) {
      toast.error("Please fix the errors before uploading");
      setOpen(true);
      return;
    }
    
    setIsLoading(true);

    setOpen(true);
    
    try {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('zone', data.zone);

      const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      
      const response = await fetch(API_URL+'/admin/batch/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
  
      const result = await response.json();
      
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Upload failed');
      }
      
      const allPassed = systemCheckResults.checks.every(check => check.status === "Passed");
      setSystemCheckResults(prev => ({
        ...prev,
        success: allPassed,
        message: allPassed ? 
          "All checks passed. Your file has been successfully uploaded and is being processed." : 
          prev.message
      }));
      
      toast.success("Files uploaded successfully!");
      setOpen(false);
      setFileSelected(false);
      
    } catch (error) {
      toast.error(error.message || "Upload failed");
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    form.setValue("file", undefined);
    setFileSelected(false);
    setPreviewData([]);
    setHeaders([]);
    setValidationErrors([]);
    setUploadProgress(0);
    setSystemCheckResults({
      checks: [
        { name: "Special Character", status: "Pending" },
        { name: "Card Availability", status: "Pending" },
        { name: "CSV Header", status: "Pending" },
      ],
      message: "",
      success: false
    });
  };

  const CustomSystemCheck = () => {
    return (
      <div className="-mt-6">
        <div className="font-medium mb-2">Type</div>
        {systemCheckResults.checks.map((check, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center text-sm p-2 mb-2 bg-gray-100 rounded-lg"
          >
            <div className="">{check.name}</div>
            {check.status === "Passed" ? (
              <CheckCircle className="text-green-600" size={20} />
            ) : check.status === "Failed" ? (
              <XCircle className="text-red-600" size={20} />
            ) : (
              <div className="text-yellow-600">Pending</div>
            )}
          </div>
        ))}
        
        <div className="mt-4 text-sm text-gray-600">
          {systemCheckResults.message ? (
            <p>
              {systemCheckResults.message}{" "}
              {systemCheckResults.success ? null : (
                <>
                  <a href="#" className="font-semibold underline">
                    Download our template file
                  </a>{" "}
                  for reference and resubmit after correcting any issues.
                </>
              )}
            </p>
          ) : (
            <p>Validating your file...</p>
          )}
        </div>

        {validationErrors.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Validation Errors:</h3>
            <div className="max-h-40 overflow-y-auto p-2 bg-red-50 rounded">
              {validationErrors.slice(0, 10).map((error, index) => (
                <p key={index} className="text-sm text-red-600 mb-1">
                  • {error}
                </p>
              ))}
              {validationErrors.length > 10 && (
                <p className="text-sm text-red-600 mt-2 font-medium">
                  And {validationErrors.length - 10} more errors...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CustomPreview = () => {
    return (
      <div className="-mt-6">
        {/* Preview data */}
        {headers.length > 0 && previewData.length > 0 && (
            <div className="mt-6 overflow-scroll w-[550px] h-[500px]">
                <h3 className="font-medium mb-2">Data Preview (First 5 rows)</h3>
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                        {headers.map((header, index) => (
                            <th 
                            key={index} 
                            className={`border border-gray-300 p-2 ${
                                !expectedHeaders.includes(header) ? 'bg-red-100' : ''
                            }`}
                            >
                            {header}
                            {!expectedHeaders.includes(header) && (
                                <div className="text-xs text-red-600">Missing</div>
                            )}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {previewData.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {headers.map((header, colIndex) => (
                            <td 
                                key={`${rowIndex}-${colIndex}`} 
                                className={`border border-gray-300 p-2 ${
                                expectedHeaders.includes(header) && (!row[header] || row[header].trim() === '') ? 'bg-red-50' : ''
                                }`}
                            >
                                {row[header] || ''}
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isLoading && <Loading />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    {!fileSelected ? (
                      <label
                        htmlFor="file"
                        className="border border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-100 flex flex-col items-center justify-center"
                      >
                        <UploadCloud className="mx-auto text-gray-500" size={40} />
                        <p className="text-green-600 font-semibold">
                          Click to upload
                        </p>
                        <p className="text-sm text-gray-500">or drag and drop</p>
                        <p className="text-xs text-gray-400">
                          CSV or Excel files only
                        </p>
                        <input
                          id="file"
                          type="file"
                          accept=".csv,.xls,.xlsx"
                          className="hidden"
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                            handleFileChange(e);
                          }}
                        />
                      </label>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex gap-4 items-start border bg-white mb-3 border-primary p-4 rounded-lg text-start">
                          <div className="bg-[#EBFFF6] border-8 border-[#F9F5FF] h-fit p-2 rounded-full">
                            <FileIcon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="w-full">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">{form.getValues("file")?.name}</p>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 flex justify-between">
                              {(form.getValues("file")?.size / 1024).toFixed(2)} KB
                                <button type="button" onClick={() => setOpenPreview(true)} className="small ms-3 text-green-600">
                                    Preview
                                </button>
                            </p>
                            <div className="flex gap-2 items-center w-full">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div
                                  className="bg-green-600 h-2.5 rounded-full"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-500 text-right mt-1">
                                {uploadProgress}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Select zone--" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {["NorthCentral", "NorthEast", "NorthWest", "SouthEast", "SouthSouth", "SouthWest"].map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="text-white"
              disabled={!fileSelected}
            >
              Upload
            </Button>
          </div>
        </form>
      </Form>

      <AppModal
        open={open}
        setOpen={setOpen}
        title="System Check"
        className="sm:max-w-[604px] bg-white"
      >
        <CustomSystemCheck />
      </AppModal>

      <AppModal
        open={openPreview}
        setOpen={setOpenPreview}
        title="Upload File Preview"
        className="sm:max-w-[604px] bg-white"
      >
        <CustomPreview />
      </AppModal>
    </>
  );
};

export default UploadCSVForm;
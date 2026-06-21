import generateInterviewReport from "../aiFeatures/aiServices.js";
import interviewReportModel from "../models/resumeResponseModel.js";
import { PDFParse } from 'pdf-parse';

async function aiReportGeneration(req,res){
    const resumeContent = await (
  new PDFParse(Uint8Array.from(req.file.buffer))
).getText();
   // const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

     const interviewReport = await interviewReportModel.create({
        user: req.user,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

async function fetchAllReports(req,res){
    try{

        const user = req.user;
        const reports = await interviewReportModel.find({user : user}).select("_id title matchScore createdAt skillGaps")
        res.status(200).json({
            reports : reports
        })
    }
    catch(err){
        console.log(err);
    }
}

async function fetchreport(req,res){
    try{

        const reportId = req.params.id;
        const report = await interviewReportModel.findById(reportId);
        res.status(200).json({
            report : report
        })
    }
    catch(err){
        console.log(err);
    }
}


export {aiReportGeneration ,fetchAllReports ,fetchreport}
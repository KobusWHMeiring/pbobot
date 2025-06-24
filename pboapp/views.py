from django.shortcuts import render
from django.http import JsonResponse
import json
from django.urls import reverse

# Create your views here.


def get_checklists():
    checklists = {
        'npc': {
            'title': 'Non-Profit Company (NPC) Registration Dashboard', # Renamed for clarity
            'description': 'Use this dashboard to generate documents and track your progress. Once all required steps are complete, you can compile your application.',
            'items': [
                {
                    'id': 'npc-name-reservation', # Unique ID for this task
                    'name': 'Name Reservation (COR 9.1)', 
                    'details': 'Reserve your proposed company name with CIPC. You can submit a few options.',
                    'link_text': 'Generate Name Reservation Form', # Button text
                    'link_url': '#', # Placeholder for the generator URL
                    'required': True # Is this task required for completion?
                },
                {
                    'id': 'npc-moi', # Unique ID
                    'name': 'Memorandum of Incorporation (MOI)', 
                    'details': 'This is your founding document. Use the generator for the standard CoR 15.1C form.',
                    'link_text': 'Generate Your MOI',
                    'link_url': reverse('pboapp:generate_npc_moi'), 
                    'required': True
                },
                {
                    'id': 'npc-notice-of-incorporation', # Unique ID
                    'name': 'Notice of Incorporation (COR 14.1)', 
                    'details': 'Includes details of initial directors, registered address, etc.',
                    'link_text': 'Generate Notice of Incorporation',
                    'link_url': '#', # Placeholder
                    'required': True
                },
                {
                    'id': 'npc-certified-ids', # Unique ID
                    'name': 'Gather Certified ID Copies', 
                    'details': 'You must gather certified ID copies for all initial directors. This is a manual step.',
                    # No link for this item, so the button will be hidden
                    'required': True
                },
            ],
            'official_link': 'https://www.cipc.co.za/za/companies/non-profit-company/'
        },
        'va': {
            'title': 'Voluntary Association (VA) NPO Registration Checklist',
            'description': 'Documents and steps required to register a VA as a Non-Profit Organisation (NPO) with the Department of Social Development (DSD).',
            'items': [
                {'name': 'Signed Constitution', 'details': 'The founding document for a VA, signed by the founding members. It must contain specific clauses required by the DSD.'},
                {'name': 'NPO Application Form (NPO Form)', 'details': 'The official application form from the DSD.'},
                {'name': 'Deed of Trust (if applicable)', 'details': 'Only required in specific circumstances.'},
                {'name': 'Certified ID Copies', 'details': 'Certified ID copies for all office-bearers.'},
                {'name': 'Minutes of a Meeting', 'details': 'Minutes of the meeting where the decision to form the VA was made and office-bearers were elected.'},
            ],
            'official_link': 'http://www.npo.gov.za/Public/Registration' # Note: Check for the most current official link
        },
        'trust': {
            'title': 'Charitable Trust Registration Checklist',
            'description': 'Documents required to register a Trust with the Master of the High Court.',
            'items': [
                {'name': 'Trust Deed', 'details': 'This is the core founding document, which must be drafted and notarized by a Notary Public.'},
                {'name': 'Letter of Authority', 'details': 'The Master issues this document to the appointed trustees, giving them legal authority to act on behalf of the trust.'},
                {'name': 'Trustee Details', 'details': 'Names, addresses, and ID copies of all appointed trustees.'},
                {'name': 'Beneficiary Details', 'details': 'Clear definition of the public beneficiaries of the trust.'},
            ],
            'official_link': 'https://www.justice.gov.za/master/trust.html'
        },
        # We can add the pbo-application checklist here later
    }
    
    return checklists
    
    

def structure_setup_view(request, checklist_type):
    """
    Displays a specific checklist based on the 'checklist_type' parameter.
    """
    
    checklist_data = get_checklists().get(checklist_type)
    context = {
        'checklist': checklist_data
    }
    
    if not context['checklist']:
        # Optional: Handle cases where a non-existent checklist is requested
        # For now, we just render a template that can show a "not found" message
        pass

    return render(request, 'pboapp/structure_setup.html', context)


def structure_selector_view(request):
    """
    Prepares the context and configuration for the single-page
    Structure Selector tool.
    """
    app_config = {
        'details': {
            'NPC': {
                'fullName': 'Non-Profit Company (NPC)',
                'description': 'An NPC is a formal legal entity registered with the CIPC. It offers the strongest liability protection for its founders (directors).',
                'pros': [
                    'Provides separate legal personality (can sign contracts, own property).',
                    'Limits the personal liability of directors.',
                    'Perceived as more formal and credible by funders and government.',
                    'Clear governance structure required by the Companies Act.'
                ],
                'cons': [
                    'More complex and costly to set up and maintain (CIPC registration).',
                    'Requires stricter governance and annual reporting to CIPC.',
                    'Less flexible than a Voluntary Association.'
                ]
            },
            'Trust': {
                'fullName': 'Charitable Trust',
                'description': 'A Trust is a legal structure where trustees manage assets on behalf of beneficiaries. It is created via a Trust Deed and registered with the Master of the High Court.',
                'pros': [
                    'Excellent for protecting and managing long-term assets (property, investments).',
                    'Can exist indefinitely (perpetual succession).',
                    'Offers good liability protection for trustees if managed correctly.'
                ],
                'cons': [
                    'Less flexible for running active, operational programs.',
                    'Can be complex and expensive to set up (requires a notary).',
                    'Governance structure is managed by Trustees and can be less democratic.'
                ]
            },
            'VA': {
                'fullName': 'Voluntary Association (VA)',
                'description': 'A VA is the simplest structure, formed by a group of people with a common objective. It is governed by a constitution signed by its members.',
                'pros': [
                    'Very easy, fast, and cheap to set up.',
                    'Highly flexible and simple to manage with minimal formalities.',
                    'Ideal for community-based or member-driven organizations (clubs, forums).'
                ],
                'cons': [
                    'Does not have a separate legal personality by default.',
                    'Founders can be held personally liable for debts.',
                    'May be seen as less formal by large corporate funders or for big contracts.'
                ]
            }
        }
    }

    context = {
        'app_config_json': json.dumps(app_config)
    }
    
    return render(request, 'pboapp/structure_selector.html', context)


def generate_npc_moi_view(request):
    """Renders the MOI generation form."""
    return render(request, 'pboapp/generate_npc_moi.html')

def preview_npc_moi_view(request):
    """Renders the MOI preview page."""
    return render(request, 'pboapp/preview_npc_moi.html')